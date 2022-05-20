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
  creator: {
    type: String,
    required: true,
  },
  createdOn: { type: Date, default: Date.now },
});

const Mix = mongoose.model("mixes", mixSchema);

export default Mix;
