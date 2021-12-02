import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sounds: [],
};

const soundSlice = createSlice({
  name: "sound",
  initialState,
  reducers: {
    saveSounds(state, action) {
      state.sounds = action.payload;
    },
    updateVolume(state, action) {
      state.sounds.find((sound) => sound._id === action.payload.id).volume =
        action.payload.volume;
    },
  },
});

export const { saveSounds, updateVolume } = soundSlice.actions;
export default soundSlice.reducer;
