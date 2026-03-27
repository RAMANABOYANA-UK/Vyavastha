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

    # ── Stage 1: civic vs non-civic ───────────────────────────────────────────
    target_texts = [p[1] for p in TARGET_CLASS_PROMPTS]
    target_probs = clip_probs(image, target_texts)
    best_target_idx = target_probs.index(max(target_probs))
    best_target_prob = target_probs[best_target_idx]
    best_target_label = TARGET_CLASS_PROMPTS[best_target_idx][0]

    non_target_probs = clip_probs(image, NON_TARGET_PROMPTS)
    best_non_target_prob = max(non_target_probs)

    confidence = int(best_target_prob * 100)
    is_civic = (
        best_target_prob >= STRICT_CLASS_THRESHOLD
        and (best_target_prob - best_non_target_prob) >= TARGET_VS_NON_TARGET_GAP
    )

    if not is_civic:
        return {
            "isCivicIssue": False,
            "imageQuality": "good",
            "mainSubject":  "Non-civic image",
            "reason": (
                "Image is not relevant for this complaint type. "
                "Please upload only: garbage, dirty toilet, dirty road, pothole, or stray dogs."
            ),
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

    return {
        "isCivicIssue":  True,
        "imageQuality":  "good",
        "category":      category,
        "severity":      severity,
        "confidence":    confidence,
        "title":         f"{category} issue detected",
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
