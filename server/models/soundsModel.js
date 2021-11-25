import mongoose from "mongoose";

const soundSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const Sound = mongoose.model("sounds", soundSchema);

export default Sound;
