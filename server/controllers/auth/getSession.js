import ApiError from "../../utils/ApiError.js";

const getSession = async (req, res, next) => {
  try {
    if (!req.session || !req.session.userData) {
      return next(new ApiError("You are not logged in", 401));
    }

    res.status(200).json({
      userData: req.session.userData,
    });
  } catch (error) {
    return next(new ApiError("You are not logged in", 401));
  }
};

export default getSession;
