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
    const { val } = req.body;
    let updatedSound = null;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({
        success: false,
        message: "No sound with that ID",
      });
    }

    const user_id = req.session.userData.user_id;

    const sound = await Sound.findById(id);

    if (val === 1) {
      updatedSound = await Sound.findByIdAndUpdate(id, {
        likeCount: sound.likeCount + val,
        $push: { likedBy: user_id },
      });
    } else {
      updatedSound = await Sound.findByIdAndUpdate(id, {
        likeCount: sound.likeCount + val,
        $pull: { likedBy: user_id },
      });
    }

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
