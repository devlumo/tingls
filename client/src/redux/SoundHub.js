import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSounds: [],
  count: 0,
};

const hubSlice = createSlice({
  name: "SoundHub",
  initialState,
  reducers: {
    addHubSound(state, action) {
      state.currentSounds.push(action.payload);
      state.count = state.currentSounds.length;
    },
    removeHubSound(state, action) {
      let currentSound = state.currentSounds.indexOf(
        state.currentSounds.find((sound) => sound._id === action.payload.id)
      );
      if (currentSound > -1) {
        state.currentSounds.splice(currentSound, 1);
        state.count = state.currentSounds.length;
      }
    },
  },
});

export const { addHubSound, removeHubSound } = hubSlice.actions;
export default hubSlice.reducer;
