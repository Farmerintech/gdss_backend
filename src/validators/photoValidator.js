export function validatePhoto(req, res, next) {
  const { uploaderName, imageUrl, publicId, tags } = req.body;

  if (!uploaderName || uploaderName.trim().length < 2) {
    res.status(400);
    return next(new Error("uploaderName is required and must be at least 2 characters"));
  }

  if (!imageUrl || !isValidUrl(imageUrl)) {
    res.status(400);
    return next(new Error("imageUrl is required and must be a valid URL"));
  }

  if (!publicId || publicId.trim().length < 2) {
    res.status(400);
    return next(new Error("publicId is required"));
  }

  if (tags && (!Array.isArray(tags) || tags.some((tag) => typeof tag !== "string"))) {
    res.status(400);
    return next(new Error("tags must be an array of strings"));
  }

  return next();
}

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}
