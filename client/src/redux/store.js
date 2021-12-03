import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./auth";
import soundSlice from "./sounds";

const store = configureStore({
  reducer: {
    user: userSlice,
    sounds: soundSlice,
  },
});

export { store };
