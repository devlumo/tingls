import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./auth";
import hubSlice from "./hub";
import soundSlice from "./sounds";
import mixSlice from "./mixes";

const store = configureStore({
  reducer: {
    user: userSlice,
    sounds: soundSlice,
    soundHub: hubSlice,
    mixes: mixSlice,
  },
});

export { store };
