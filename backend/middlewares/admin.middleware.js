const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/handler");

module.exports.isAuthenticatedAdmin = (req, res, next) => {
  try {
    const token =
      req?.cookies?.token ||
      req?.query?.token ||
      req?.headers?.["authorization"]?.split(" ")?.[1] ||
      null;

    if (!token) {
      return errorHandler(res, "Unauthorized", 401);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (req?.user?.role?.toString() !== "admin") {
      return errorHandler(res, "Unauthorized", 401);
    }
    next();
  } catch (error) {
    return errorHandler(res, "Access Denied User Unauthorized", 401);
  }
};