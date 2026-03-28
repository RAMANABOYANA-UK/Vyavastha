# Image Verification System Update - Changes Summary

## Overview
Updated the image verification logic to:
- ✅ **ACCEPT** real camera photos (with EXIF metadata)
- ✅ **ACCEPT** screenshots (citizens may screenshot maps/location)
- ❌ **REJECT** AI-generated images only (probability > 0.6)
- ❌ **REJECT** animated images

---

## Files Modified

### 1. **backend/services/imageVerificationService.js**

#### Layer 1 - EXIF Check (Updated)
**Before:**
- Rejected images with no EXIF data immediately

**After:**
- If camera metadata exists → ACCEPT (real photo)
- If no EXIF data → Continue to Layer 2 (don't reject)
- Screenshots won't have EXIF but may be accepted by Layer 2

**Key Change:**
```javascript
// Now returns { passed: null } instead of { passed: false }
// This allows Layer 2 (Sightengine) to analyze further
```

---

#### Layer 2 - Sightengine Check (Completely Refactored)
**Before:**
```
- Screenshot (> 0.5) → REJECT
- Animated (> 0.5) → REJECT  
- AI Generated (> 0.5) → REJECT
- Everything else → ACCEPT
```

**After:**
```
- AI Generated (> 0.6) → REJECT with code: 'AI_GENERATED'
- Screenshot (> 0.5) → ACCEPT (passes verification)
- Animated (> 0.5) → REJECT with code: 'ANIMATED'
- Everything else → ACCEPT
```

**Error Messages:**
```javascript
AI_GENERATED: "AI generated images are not accepted as evidence"
ANIMATED: "Animated images not accepted"
```

**Success Messages:**
```javascript
Screenshot: "Screenshot verified as acceptable evidence"
Real Photo: "Image verified - real photo or screenshot accepted"
```

---

#### Layer 3 - Image Sanity Check
- No changes to file size, format, or dimension checks
- Still rejects images < 400x400 pixels
- Still rejects invalid formats (non-JPG/PNG/WebP)

---

#### Final Success Response
**Before:**
```json
{
  "verified": true,
  "message": "Image verified as real photo",
  "metadata": { ... }
}
```

**After:**
```json
{
  "verified": true,
  "message": "Image verified — real photo or screenshot accepted",
  "metadata": {
    "imageType": "screenshot" | "real_photo" | "unknown",
    ...
  }
}
```

---

### 2. **frontend/src/components/ImageUpload.jsx**

#### Component Documentation
- Updated to reflect: "Accepts real camera photos and screenshots"
- Changed from: "Rejects screenshots, AI-generated images..."

#### Error Messages Object
**Removed:**
```javascript
SCREENSHOT: '📱 Screenshots are not accepted. Please take a real photo.'
NO_EXIF: '📷 Please upload an original photo taken from your camera.'
```

**Kept:**
```javascript
AI_GENERATED: '🤖 AI generated images are not accepted as evidence. Please upload a real photo.'
ANIMATED: '🎨 Animated images are not accepted.'
INVALID_FORMAT: '❌ Only JPG, PNG, WebP allowed.'
```

#### Success Message
**Before:**
```
"✅ Photo verified as real image"
```

**After:**
```
"✅ Image verified — real photo or screenshot accepted"
```

---

## API Endpoint Behavior

### POST /api/complaints/verify-image
**Success Response (200):**
```json
{
  "verified": true,
  "message": "Image verified — real photo or screenshot accepted",
  "metadata": {
    "imageType": "screenshot|real_photo|unknown",
    "dimensions": {"width": 1080, "height": 1920},
    "cameraModel": "iPhone 12 Pro" | "Unknown",
    "hasGPS": true|false
  }
}
```

**Rejection Responses (400):**

1. **AI Generated Image:**
```json
{
  "verified": false,
  "message": "AI generated images are not accepted as evidence",
  "code": "AI_GENERATED"
}
```

2. **Animated Image:**
```json
{
  "verified": false,
  "message": "Animated images not accepted",
  "code": "ANIMATED"
}
```

3. **Invalid Format:**
```json
{
  "verified": false,
  "message": "Invalid file format: image/bmp. Only JPG, PNG, WebP allowed.",
  "code": "INVALID_FORMAT"
}
```

---

## Testing Checklist

- [ ] **Screenshot Upload**: Upload a map/location screenshot → should PASS ✅
- [ ] **Real Photo**: Upload camera photo with EXIF → should PASS ✅
- [ ] **AI Generated**: Upload AI image (e.g., DALL-E) → should REJECT with "AI_GENERATED" ❌
- [ ] **Animated GIF**: Upload animated GIF → should REJECT with "ANIMATED" ❌
- [ ] **Invalid Format**: Upload BMP/TIFF → should REJECT with "INVALID_FORMAT" ❌
- [ ] **No EXIF but Real**: Upload JPEG without EXIF (edited) → should PASS if Sightengine approves ✅

---

## Frontend User Experience

### Upload Screen
"Drag and drop your photo here" / "JPG, PNG, WebP • Max 15MB"

### Loading
"Verifying image authenticity..."

### Success (Screenshot or Photo)
✅ Image verified — real photo or screenshot accepted
*This image has passed authenticity verification*

### Error - AI Generated
🤖 AI generated images are not accepted as evidence. Please upload a real photo.

### Error - Animated
🎨 Animated images are not accepted.

### Error - Invalid Format
❌ Only JPG, PNG, WebP allowed.

---

## Backward Compatibility Notes

1. **Existing SCREENSHOT error code removed** from error messages
2. **NO_EXIF error code removed** - no longer used in verification flow
3. **Code mappings in backend** updated to only include: `AI_GENERATED`, `ANIMATED`, `INVALID_FORMAT`
4. Any frontend code checking for SCREENSHOT or NO_EXIF error codes should be updated

---

## Environment Variables Required

```
SIGHTENGINE_API_USER=your_api_user
SIGHTENGINE_API_SECRET=your_api_secret
```

These are used by Layer 2 (Sightengine API) to detect image types and AI generation probability.

---

## Files Changed
1. ✅ `backend/services/imageVerificationService.js` - 3 function updates
2. ✅ `frontend/src/components/ImageUpload.jsx` - 3 updates (docstring, error messages, success message)

**Total Changes:** 2 files | ~50 lines modified/updated
