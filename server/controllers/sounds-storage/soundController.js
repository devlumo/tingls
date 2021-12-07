import Sound from "../../models/soundsModel.js";
import ApiError from "../../utils/ApiError.js";

const getAllSounds = async (req, res, next) => {
  try {
    const sounds = await Sound.find();

    res.status(200).json({
      success: true,
      sounds,
    });
  } catch (error) {
    next(new ApiError("Nothing found here", 404));
  }
};

const createSound = async (req, res, next) => {
  try {
    const newSound = await Sound.create(req.body);

    res.status(200).json({
      success: true,
      message: "New sound created",
      newSound,
    });
  } catch (error) {
    next(new ApiError("Something went wrong", 400));
  }
};

export { getAllSounds, createSound };
