import ApiError from "../../utils/ApiError.js";

const protect = (req, res, next) => {
  if (!req.session || !req.session.userData) {
    return next(new ApiError("Please login to view this content"));
  }
  next();
};

export { protect };
