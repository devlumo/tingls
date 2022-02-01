import mongoose from "mongoose";

const mixSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  data: {
    type: String,
    required: true,
  },
});

const Mix = mongoose.model("mixes", mixSchema);

export default Mix;
