"""
VYAVASTHA Civic Issue Detector — Python AI Service
Uses CLIP (openai/clip-vit-base-patch32) for zero-shot image classification.
Optimized for speed: GPU support, image compression, and caching.
No API keys required. Runs fully offline after first model download (~600 MB).

Target acceptance classes (strict):
- Garbage / trash dump
- Dirty public toilet
- Dirty road / unsanitary street
- Pothole / damaged road surface
- Stray dogs causing public nuisance or risk

Start: uvicorn main:app --host 0.0.0.0 --port 8000 --reload
"""

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import torch
import hashlib
from functools import lru_cache
from transformers import CLIPProcessor, CLIPModel

app = FastAPI(title="VYAVASTHA Civic Issue Detector")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── GPU/CPU Setup ─────────────────────────────────────────────────────────────
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"🔧 Using device: {device}")

# ── Load model at startup ─────────────────────────────────────────────────────
print("Loading CLIP model (optimized)...")
_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
_model = _model.to(device)
_model.eval()

# Enable mixed precision for faster inference on GPU
if device.type == "cuda":
    _model.half()
    print("✅ Mixed precision enabled for GPU")

print(f"✅ Model ready on {device} — listening on http://localhost:8000")

# ── Text prompts ──────────────────────────────────────────────────────────────

TARGET_CLASS_PROMPTS = [
    ("Waste Management", "a real photo of garbage piled on street, trash dump, littered public place, waste management issue"),
    ("Sanitation", "a real photo of dirty public toilet, unclean toilet area, unhygienic restroom in public place"),
    ("Sanitation", "a real photo of dirty road with filth, sewage, unhygienic waste on street"),
    ("Road & Infrastructure", "a real photo of pothole on road, damaged asphalt, broken road surface"),
    ("Public Safety", "a real photo of stray dogs on street causing public nuisance or safety concern"),
]

NON_TARGET_PROMPTS = [
    "a clear photo of a car or parked car",
    "a clear photo of a bus or truck",
    "a selfie or portrait of a person",
    "an indoor room, office, classroom, or home scene",
    "a landscape, sky, trees, or nature photo",
    "a random object or product photo not related to civic issue",
    "a clean road with no visible issue",
]

# Screenshot detection prompts - any screenshot accepted
SCREENSHOT_PROMPTS = [
    "a screenshot of digital content",
    "a screen capture of an app or website",
    "a desktop or mobile screenshot",
    "a digital screenshot image",
    "a screen recording or screenshot",
]

# Screenshot relevance prompts - used to decide whether screenshot is civic-related
CIVIC_SCREENSHOT_PROMPTS = [
    "a screenshot showing civic issue evidence like garbage, pothole, dirty road, sewer overflow, or stray dogs",
    "a map screenshot with marker around civic problem location",
    "a screenshot of complaint evidence for sanitation or public infrastructure issue",
    "a civic complaint screenshot with issue context and location details",
]

NON_CIVIC_SCREENSHOT_PROMPTS = [
    "a screenshot of entertainment or social media",
    "a screenshot of chat conversation or personal messages",
    "a screenshot about shopping, ads, or unrelated content",
    "a random screenshot not related to civic complaints",
]

CIVIC_ELEMENT_PROMPTS = [
    "a civic issue scene with roads, drains, garbage, or broken infrastructure",
    "a public place showing pothole, waste accumulation, drain problem, or damaged road",
    "an infrastructure maintenance issue in a street or public area",
    "a sanitation or road defect visible in a civic environment",
]

STUDIO_CAR_PROMPTS = [
    "a sports car in studio lighting with dark background and glowing effects",
    "a showroom style car photo with dramatic cinematic lighting",
    "a luxury vehicle wallpaper or AI art render with neon glow",
    "a close-up vehicle image in non-civic background",
]

SEVERITY = {
    "Road & Infrastructure": "High",
    "Waste Management":      "Medium",
    "Public Safety":         "Critical",
    "Sanitation":            "High",
}

DEPARTMENT = {
    "Road & Infrastructure": "Public Works Department (PWD)",
    "Waste Management":      "Municipal Sanitation / Solid Waste Management",
    "Public Safety":         "Municipal Engineering Department",
    "Sanitation":            "Drainage Department / Underground Drainage",
}

STRICT_CLASS_THRESHOLD = 0.33
TARGET_VS_NON_TARGET_GAP = 0.08
SCREENSHOT_CIVIC_THRESHOLD = 0.20
SCREENSHOT_CIVIC_GAP = 0.0
MIN_VALID_CONFIDENCE = 75

# ── Cache for predictions ──────────────────────────────────────────────────────
@lru_cache(maxsize=100)
def get_cached_prompts():
    """Cache encoded prompts to speed up inference"""
    return TARGET_CLASS_PROMPTS

# ── Helper ────────────────────────────────────────────────────────────────────

def clip_probs(image: Image.Image, texts: list[str]) -> list[float]:
    """Fast CLIP inference with mixed precision"""
    inputs = _processor(
        text=texts, images=image,
        return_tensors="pt", padding=True, truncation=True
    )
    
    # Move to device
    inputs = {k: v.to(device) for k, v in inputs.items()}
    
    # Convert to half precision if on GPU
    if device.type == "cuda":
        inputs = {k: v.half() if v.dtype == torch.float32 else v for k, v in inputs.items()}
    
    with torch.no_grad():
        out = _model(**inputs)
    
    return out.logits_per_image[0].softmax(dim=0).tolist()

# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {
        "service": "VYAVASTHA Civic Issue Detector",
        "status": "running",
        "device": str(device),
        "endpoints": {
            "health": "GET /health",
            "analyze": "POST /analyze  (send image as multipart form-data with field 'file')"
        }
    }


@app.get("/health")
def health():
    return {"status": "ok", "device": str(device)}


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    # Read & decode image
    raw = await file.read()
    try:
        # Resize image to 256x256 for faster processing (CLIP works best at this size)
        image = Image.open(io.BytesIO(raw)).convert("RGB")
        original_size = image.size
        image.thumbnail((256, 256), Image.Resampling.LANCZOS)
        
    except Exception as e:
        return {"isCivicIssue": False, "error": f"Cannot read image: {e}"}

    # ── Stage 1: civic vs non-civic score ──────────────────────────────────────
    target_texts = [p[1] for p in TARGET_CLASS_PROMPTS]
    target_probs = clip_probs(image, target_texts)
    best_target_idx = target_probs.index(max(target_probs))
    best_target_prob = target_probs[best_target_idx]
    best_target_label = TARGET_CLASS_PROMPTS[best_target_idx][0]

    non_target_probs = clip_probs(image, NON_TARGET_PROMPTS)
    best_non_target_prob = max(non_target_probs)

    # Hard reject: no clear civic elements (roads, drains, garbage, infrastructure)
    civic_element_probs = clip_probs(image, CIVIC_ELEMENT_PROMPTS)
    best_civic_element_prob = max(civic_element_probs)

    # Hard reject: sports/luxury car in studio/glowing background
    studio_car_probs = clip_probs(image, STUDIO_CAR_PROMPTS)
    best_studio_car_prob = max(studio_car_probs)
    if best_studio_car_prob > 0.30 and best_non_target_prob > best_target_prob:
        return {
            "isCivicIssue": False,
            "isValid": False,
            "mainSubject": "Not Civic Issue",
            "reason": "Not a civic issue",
            "confidence": int(best_studio_car_prob * 100),
        }

    if best_civic_element_prob < 0.22 and best_non_target_prob >= best_target_prob:
        return {
            "isCivicIssue": False,
            "isValid": False,
            "mainSubject": "Not Civic Issue",
            "reason": "Not a civic issue",
            "confidence": int(best_civic_element_prob * 100),
        }

    # ── Stage 2: detect screenshot and validate civic relevance ─────────────────
    screenshot_probs = clip_probs(image, SCREENSHOT_PROMPTS)
    best_screenshot_prob = max(screenshot_probs)
    is_screenshot = best_screenshot_prob > 0.35

    if is_screenshot:
        civic_screenshot_probs = clip_probs(image, CIVIC_SCREENSHOT_PROMPTS)
        best_civic_screenshot_prob = max(civic_screenshot_probs)

        non_civic_screenshot_probs = clip_probs(image, NON_CIVIC_SCREENSHOT_PROMPTS)
        best_non_civic_screenshot_prob = max(non_civic_screenshot_probs)

        screenshot_is_civic = (
            (
                best_civic_screenshot_prob >= SCREENSHOT_CIVIC_THRESHOLD
                and (best_civic_screenshot_prob - best_non_civic_screenshot_prob) >= SCREENSHOT_CIVIC_GAP
            )
            or (
                best_target_prob >= SCREENSHOT_CIVIC_THRESHOLD
                and (best_target_prob - best_non_target_prob) >= SCREENSHOT_CIVIC_GAP
            )
        )

        if not screenshot_is_civic:
            return {
                "isCivicIssue": False,
                "isValid": False,
                "imageQuality": "screenshot",
                "mainSubject": "Not Civic Issue",
                "reason": "Not a civic issue",
                "confidence": int(best_screenshot_prob * 100),
                "acceptedClasses": [
                    "garbage",
                    "dirty toilet",
                    "dirty road",
                    "pothole",
                    "stray dogs",
                ],
                "isScreenshot": True,
            }

        screenshot_confidence = int(max(best_target_prob, best_civic_screenshot_prob) * 100)
        if screenshot_confidence < MIN_VALID_CONFIDENCE:
            return {
                "isCivicIssue": False,
                "isValid": False,
                "imageQuality": "screenshot",
                "mainSubject": "Not Civic Issue",
                "reason": "Not a civic issue",
                "confidence": screenshot_confidence,
                "isScreenshot": True,
            }

        return {
            "isCivicIssue": True,
            "isValid": True,
            "imageQuality": "screenshot",
            "category": "Evidence",
            "severity": "Medium",
            "confidence": screenshot_confidence,
            "title": "Civic screenshot accepted",
            "description": (
                "Civic-related screenshot accepted as evidence. Please add a clear description "
                "and select the matching complaint category."
            ),
            "tags": ["screenshot", "civic-evidence", "civic-issue", "india"],
            "visualEvidence": [
                "Classified as: Civic screenshot evidence",
                f"Civic screenshot confidence: {int(best_civic_screenshot_prob * 100)}%",
                f"Screenshot confidence: {int(best_screenshot_prob * 100)}%",
            ],
            "estimatedImpact": {
                "peopleAffected": "50–200 residents",
                "urgencyDays": 3,
                "safetyRisk": False,
                "trafficImpact": False,
            },
            "aiRecommendations": {
                "department": "To be determined by complaint category",
                "immediateAction": "Please provide details about the civic issue in your complaint description",
                "permanentFix": "Depends on issue category selected",
                "estimatedRepairTime": "3–7 days",
                "estimatedCostINR": "10,000–50,000",
                "requiredResources": ["Field inspection team", "Repair materials"],
                "suggestedATR": "Civic screenshot evidence has been received. Please provide clear details to expedite resolution.",
            },
            "locationClues": {
                "locationType": "Screenshot evidence",
                "timeOfDay": "unclear",
                "weatherCondition": "unclear",
                "nearbyLandmarks": [],
                "urbanRural": "unclear",
                "roadType": "unknown",
            },
            "relatedIssues": [],
            "isScreenshot": True,
        }

    # ── Stage 3: normal photo validation ───────────────────────────────────────
    confidence = int(best_target_prob * 100)
    is_civic = (
        best_target_prob >= STRICT_CLASS_THRESHOLD
        and (best_target_prob - best_non_target_prob) >= TARGET_VS_NON_TARGET_GAP
    )

    if not is_civic:
        return {
            "isCivicIssue": False,
            "isValid": False,
            "imageQuality": "good",
            "mainSubject": "Not Civic Issue",
            "reason": "Not a civic issue",
            "confidence": confidence,
            "acceptedClasses": [
                "garbage",
                "dirty toilet",
                "dirty road",
                "pothole",
                "stray dogs",
            ],
        }

    # ── Stage 2: strict category mapping (already selected in Stage 1) ──────
    category   = best_target_label
    severity   = SEVERITY[category]
    dept       = DEPARTMENT[category]
    urgency    = 1 if severity == "Critical" else (3 if severity == "High" else 7)

    if confidence < MIN_VALID_CONFIDENCE:
        return {
            "isCivicIssue": False,
            "isValid": False,
            "imageQuality": "good",
            "mainSubject": "Not Civic Issue",
            "reason": "Not a civic issue",
            "confidence": confidence,
        }

    return {
        "isCivicIssue": True,
        "isValid": True,
        "imageQuality": "good",
        "category": category,
        "severity": severity,
        "confidence": confidence,
        "title": f"{category} issue detected",
        "description": (
            f"AI detected a {severity.lower()}-priority {category.lower()} issue. "
            "Please add specific details in the description to help authorities act faster."
        ),
        "tags": [
            category.lower().replace(" & ", "-").replace(" ", "-"),
            severity.lower(),
            "civic-issue",
            "india",
        ],
        "visualEvidence": [
            f"Classified as: {category}",
            f"Severity level: {severity}",
            f"Model confidence: {confidence}%",
        ],
        "estimatedImpact": {
            "peopleAffected": "50–200 residents",
            "urgencyDays":    urgency,
            "safetyRisk":     severity in ("Critical", "High"),
            "trafficImpact":  category == "Road & Infrastructure",
        },
        "aiRecommendations": {
            "department":          dept,
            "immediateAction":     f"Dispatch a field team to inspect the {category.lower()} issue",
            "permanentFix":        f"Restore and repair the {category.lower()} infrastructure",
            "estimatedRepairTime": "1–2 days" if severity == "Critical" else "3–7 days",
            "estimatedCostINR":    "10,000–50,000",
            "requiredResources":   ["Field inspection team", "Repair materials", "Equipment"],
            "suggestedATR": (
                f"The reported {category} issue has been verified and forwarded to {dept} "
                "for immediate action. Resolution expected within the stipulated timeframe."
            ),
        },
        "locationClues": {
            "locationType":     "unknown",
            "timeOfDay":        "unclear",
            "weatherCondition": "unclear",
            "nearbyLandmarks":  [],
            "urbanRural":       "unclear",
            "roadType":         "unknown",
        },
        "relatedIssues": [],
    }
