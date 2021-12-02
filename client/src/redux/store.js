import { configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import userSlice from "./auth";
import soundSlice from "./sounds";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedSounds = persistReducer(persistConfig, soundSlice);

const store = configureStore({
  reducer: {
    user: userSlice,
    sounds: persistedSounds,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

export { persistor, store };
