import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./auth";
import hubSlice from "./hub";
import soundSlice from "./sounds";

const store = configureStore({
  reducer: {
    user: userSlice,
    sounds: soundSlice,
    soundHub: hubSlice,
  },
});

export { store };
