const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal Server Error";

  // Wrong MongoDb id error

  if (err.name === "CastError") {
    const message = `resource not found, Invalid ${err.path} `;
    err = new ErrorHandler(message, 400);
  }
  // mongoose duplicate key error

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error

  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Please Try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expire error

  if (err.name === "TokenExpireError") {
    const message = `Json Web Toke is Expired, Please tyr again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
