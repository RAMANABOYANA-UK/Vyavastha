import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';
import exifr from 'exifr';
import sharp from 'sharp';
import { fileTypeFromFile } from 'file-type';

const SIGHTENGINE_API_USER = process.env.SIGHTENGINE_API_USER;
const SIGHTENGINE_API_SECRET = process.env.SIGHTENGINE_API_SECRET;

/**
 * Layer 1: Check EXIF metadata for camera information
 * Note: Screenshots won't have EXIF data, so we don't reject them here.
 * AI detection happens in Layer 2 (Sightengine).
 */
const checkEXIF = async (filePath) => {
  try {
    const exifData = await exifr.parse(filePath);

    // If EXIF exists and has camera metadata, it's a real photo
    if (exifData) {
      const hasCamera = exifData.Make || exifData.Model;
      
      if (hasCamera) {
        return {
          passed: true,
          reason: 'Camera metadata detected',
          confidence: 0.9,
          cameraModel: exifData.Model || exifData.Make,
          hasGPS: exifData.latitude && exifData.longitude
        };
      }
    }

    // No EXIF data found — don't reject, continue to Layer 2
    // Screenshots won't have EXIF, but may be accepted by Layer 2
    return {
      passed: null,
      reason: 'No EXIF metadata found, continuing to Layer 2 for further analysis',
      skipped: true
    };
  } catch (error) {
    console.error('EXIF check error:', error.message);
    // Skip if EXIF parsing fails - continue to next layer
    return {
      passed: null,
      reason: 'EXIF parsing skipped due to error',
      skipped: true
    };
  }
};

/**
 * Layer 2: Use Sightengine API to detect AI-generated and animated images
 * ACCEPT: Real camera photos, screenshots
 * REJECT: AI-generated images, animated images
 */
const checkSightengine = async (filePath) => {
  try {
    if (!SIGHTENGINE_API_USER || !SIGHTENGINE_API_SECRET) {
      console.warn('Sightengine credentials not configured, skipping Layer 2');
      return {
        passed: null,
        reason: 'Sightengine check skipped - credentials not configured',
        skipped: true
      };
    }

    const stream = fs.createReadStream(filePath);
    const form = new FormData();
    form.append('media', stream);
    form.append('models', 'type,ai-generated');
    form.append('api_user', SIGHTENGINE_API_USER);
    form.append('api_secret', SIGHTENGINE_API_SECRET);

    const response = await axios.post(
      'https://api.sightengine.com/1.0/check.json',
      form,
      {
        headers: form.getHeaders(),
        timeout: 30000
      }
    );

    const { type, ai_generated } = response.data;

    // AI-generated check must run first (REJECT if > 0.6 confidence)
    if (ai_generated?.probability > 0.6) {
      return {
        passed: false,
        reason: 'AI generated images are not accepted as evidence',
        code: 'AI_GENERATED',
        detectedType: 'ai_generated'
      };
    }

    // Check for screenshot (ACCEPT - do not reject)
    if (type?.screenshot > 0.5) {
      return {
        passed: true,
        reason: 'Screenshot verified as acceptable evidence',
        detectedType: 'screenshot'
      };
    }

    // Check for animated image (REJECT)
    if (type?.animated > 0.5) {
      return {
        passed: false,
        reason: 'Animated images not accepted',
        code: 'ANIMATED',
        detectedType: 'animated'
      };
    }

    // Everything else: real photo or other valid image type (ACCEPT)
    return {
      passed: true,
      reason: 'Image verified - real photo or screenshot accepted',
      detectedType: 'real_photo'
    };
  } catch (error) {
    console.error('Sightengine check error:', error.message);
    // Skip if API fails - continue to next layer
    return {
      passed: null,
      reason: 'Sightengine check skipped due to API error',
      skipped: true
    };
  }
};

/**
 * Layer 3: Check file size, mimetype, and basic image properties
 */
const checkImageSanity = async (filePath) => {
  try {
    // Check file size (20KB to 15MB)
    const stats = fs.statSync(filePath);
    const fileSizeKB = stats.size / 1024;

    if (fileSizeKB < 20) {
      return {
        passed: false,
        reason: 'File is too small (minimum 20KB). Screenshots are often smaller.'
      };
    }

    if (fileSizeKB > 15360) {
      return {
        passed: false,
        reason: 'File is too large (maximum 15MB)'
      };
    }

    // Check mimetype
    const fileType = await fileTypeFromFile(filePath);
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!fileType || !allowedMimeTypes.includes(fileType.mime)) {
      return {
        passed: false,
        reason: `Invalid file format: ${fileType?.mime || 'unknown'}. Only JPG, PNG, WebP allowed.`
      };
    }

    // Check image dimensions
    let metadata;
    try {
      metadata = await sharp(filePath).metadata();
    } catch (err) {
      console.error('Sharp metadata error:', err.message);
      return {
        passed: false,
        reason: 'Unable to read image properties'
      };
    }

    const { width, height } = metadata;

    if (!width || !height) {
      return {
        passed: false,
        reason: 'Unable to determine image dimensions'
      };
    }

    if (width < 400 || height < 400) {
      return {
        passed: false,
        reason: 'Image resolution too low (minimum 400x400 pixels)'
      };
    }

    // Warn about common screenshot aspect ratios but don't reject
    const aspectRatio = (width / height).toFixed(2);
    const isCommonScreenshotRatio = aspectRatio === '1.78' || aspectRatio === '0.56'; // 16:9 or 9:16
    const ratioWarning = isCommonScreenshotRatio
      ? 'Note: Image has common screenshot aspect ratio'
      : null;

    return {
      passed: true,
      reason: 'Image dimensions and format valid',
      dimensions: { width, height },
      warning: ratioWarning
    };
  } catch (error) {
    console.error('Image sanity check error:', error.message);
    return {
      passed: false,
      reason: 'Error validating image properties'
    };
  }
};

/**
 * Master verification function: Runs all 3 layers
 */
export const verifyImage = async (filePath) => {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return {
        verified: false,
        message: 'File not found',
        code: 'FILE_NOT_FOUND'
      };
    }

    console.log(`[IMAGE VERIFY] Starting verification for: ${path.basename(filePath)}`);

    // Layer 1: EXIF Check
    console.log('[IMAGE VERIFY] Layer 1: EXIF Check...');
    const exifResult = await checkEXIF(filePath);
    
    if (exifResult.passed === false) {
      return {
        verified: false,
        message: exifResult.reason,
        code: 'NO_EXIF'
      };
    }

    // Layer 2: Sightengine API Check
    console.log('[IMAGE VERIFY] Layer 2: Sightengine Check...');
    const sightengineResult = await checkSightengine(filePath);

    if (sightengineResult.passed === false) {
      return {
        verified: false,
        message: sightengineResult.reason,
        code: sightengineResult.code || 'INVALID_IMAGE'
      };
    }

    // Layer 3: Image Sanity Check
    console.log('[IMAGE VERIFY] Layer 3: Image Sanity Check...');
    const sanityResult = await checkImageSanity(filePath);

    if (sanityResult.passed === false) {
      return {
        verified: false,
        message: sanityResult.reason,
        code: 'INVALID_FORMAT'
      };
    }

    // All layers passed
    console.log('[IMAGE VERIFY] ✓ All verification layers passed');
    return {
      verified: true,
      message: 'Image verified — real photo or screenshot accepted',
      metadata: {
        hasGPS: exifResult.hasGPS || false,
        cameraModel: exifResult.cameraModel || 'Unknown',
        dimensions: sanityResult.dimensions,
        imageType: sightengineResult.detectedType || 'unknown'
      }
    };
  } catch (error) {
    console.error('Critical error in image verification:', error.message);
    // Don't block on critical errors - log and allow
    return {
      verified: true,
      message: 'Image verification skipped due to system error',
      metadata: { skipped: true }
    };
  }
};

export default verifyImage;
