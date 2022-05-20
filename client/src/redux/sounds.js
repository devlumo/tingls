import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSounds } from "../api/api";

export const getSounds = createAsyncThunk("sounds/getSounds", async () => {
  const result = await fetchSounds();
  return result.data.sounds;
});

const soundSlice = createSlice({
  name: "sound",
  initialState: {
    sounds: [],
    status: null,
    globalPlay: false,
  },
  reducers: {
    updateVolume(state, action) {
      state.sounds.find((sound) => sound._id === action.payload.id).volume =
        action.payload.volume;
    },

    updateGlobalPlay(state, action) {
      state.globalPlay = action.payload;
    },
  },
  extraReducers: {
    [getSounds.pending]: (state, action) => {
      state.status = "Loading";
    },
    [getSounds.fulfilled]: (state, action) => {
      state.sounds = action.payload;
      state.status = "Complete";
    },
    [getSounds.rejected]: (state, action) => {
      state.status = "Couldn't fetch new data";
    },
  },
});

export const { updateVolume, updateGlobalPlay } = soundSlice.actions;
export default soundSlice.reducer;
