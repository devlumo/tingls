import Sound from "../../models/soundsModel.js";
import ApiError from "../../utils/ApiError.js";
import mongoose from "mongoose";

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

const likeSound = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({
        success: false,
        message: "No sound with that ID",
      });
    }

    if (!req.session || !req.session.userData) {
      return next(new ApiError("You are not logged in", 401));
    }

    const sound = await Sound.findById(id);

    const updatedSound = await Sound.findByIdAndUpdate(id, {
      likeCount: sound.likeCount + 1,
    });

    res.status(200).json({
      success: true,
      message: "Sound updated",
      updatedSound,
    });
  } catch (error) {
    console.log(error);
    next(new ApiError("Something went wrong", 400));
  }
};

export { getAllSounds, createSound, likeSound };
