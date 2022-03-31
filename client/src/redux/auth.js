import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  email: null,
  userID: null,
  likedSounds: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.userName = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setID(state, action) {
      state.userID = action.payload;
    },
    setLikedSounds(state, action) {
      state.likedSounds = action.payload;
    },
  },
});

export const { setUsername, setEmail, setID, setLikedSounds } =
  userSlice.actions;
export default userSlice.reducer;
