import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./auth";

export default configureStore({
  reducer: {
    user: userSlice,
  },
});
