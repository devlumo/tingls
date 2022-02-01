import ApiError from "../../utils/ApiError.js";
import Mix from "../../models/mixModel.js";

const createMix = async (req, res, next) => {
  try {
    const newMix = await Mix.create(req.body);

    res.status(200).json({
      success: true,
      message: "New sound created",
      newMix,
    });
  } catch (error) {
    next(new ApiError("Something went wrong", 400));
  }
};

export { createMix };
