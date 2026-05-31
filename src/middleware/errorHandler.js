export function errorHandler(error, _req, res, _next) {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      details: Object.values(error.errors).map((item) => item.message)
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      message: "Duplicate resource",
      details: error.keyValue
    });
  }

  return res.status(statusCode).json({
    message: error.message || "Server error"
  });
}
