import Sound from "../../models/soundsModel.js";

const getAllSounds = async (req, res, next) => {
  try {
    const sounds = await Sound.find();

    res.status(200).json({
      success: true,
      sounds,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export { getAllSounds, createSound };
