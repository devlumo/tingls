import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMixes } from "../api/api";

export const getMixes = createAsyncThunk("mixes/getMixes", async () => {
  const result = await fetchMixes();
  return result.data.mixes;
});

const mixSlice = createSlice({
  name: "mixes",
  initialState: {
    mixes: [],
    status: null,
  },
  reducers: {},

  // fulfilled staus stores the fetched data in the state container
  extraReducers: {
    [getMixes.pending]: (state, action) => {
      state.status = "Loading";
    },
    [getMixes.fulfilled]: (state, action) => {
      state.mixes = action.payload;
      state.status = "Complete";
    },
    [getMixes.rejected]: (state, action) => {
      state.status = "Couldn't fetch new data";
    },
  },
});

export default mixSlice.reducer;
