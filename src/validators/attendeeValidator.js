export function validateAttendee(req, res, next) {
  const { fullName, nickname, profileImageUrl } = req.body;

  if (!fullName || fullName.trim().length < 2) {
    res.status(400);
    return next(new Error("fullName is required and must be at least 2 characters"));
  }

  if (nickname && nickname.length > 60) {
    res.status(400);
    return next(new Error("nickname must be 60 characters or less"));
  }

  if (profileImageUrl && !isValidUrl(profileImageUrl)) {
    res.status(400);
    return next(new Error("profileImageUrl must be a valid URL"));
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
