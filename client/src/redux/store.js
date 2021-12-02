import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./auth";
import soundSlice from "./sounds";

export default configureStore({
  reducer: {
    user: userSlice,
    sounds: soundSlice,
  },
});
