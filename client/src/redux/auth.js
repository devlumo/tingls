import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  email: null,
  userID: null,
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
  },
});

export const { setUsername, setEmail, setID } = userSlice.actions;
export default userSlice.reducer;
