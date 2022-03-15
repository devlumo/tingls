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
  tags: {
    type: Array,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
  },
  likedBy: {
    type: Array,
    default: [],
  },
});

const Sound = mongoose.model("sounds", soundSchema);

export default Sound;
