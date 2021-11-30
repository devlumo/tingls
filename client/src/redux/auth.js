import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  email: null,
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
  },
});

export const { setUsername, setEmail } = userSlice.actions;
export default userSlice.reducer;
