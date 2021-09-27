const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// Checks if user is authenticateed or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  //console.log(token)

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //console.log(decoded);
  req.user = await User.findById(decoded.id);
  //console.log(req.user)

  next();
});

// Handling users roles
exports.authorizeRoles = (...roles) => {
  //console.log(...roles);
  return (req, res, next) => {
    //console.log(req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};
