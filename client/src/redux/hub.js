import { createSlice } from "@reduxjs/toolkit";
import { removeHowl } from "../utils/howlerUtils";

// TODO: Get the local storage, move into its own component
if (!localStorage.getItem("app_state")) {
  localStorage.setItem(
    "app_state",
    JSON.stringify({
      hubSounds: [],
      hubPlay: false,
    })
  );
}

// Get the initial state from local storage
const storedState = JSON.parse(localStorage.getItem("app_state"));

const initialState = {
  currentSounds: [...storedState.hubSounds],
  count: 0,
};

const hubSlice = createSlice({
  name: "SoundHub",
  initialState,
  reducers: {
    addHubSound(state, action) {
      // get the stored state and check if the current sound exists there
      const storedState = JSON.parse(localStorage.getItem("app_state"));
      const currentSound = storedState.hubSounds.find(
        (sound) => sound.id === action.payload.id
      );

      // check if sound is already stored and add it if not
      if (!currentSound) {
        state.currentSounds.push(action.payload);
        state.count = state.currentSounds.length;

        // update local storage
        const updated = [...storedState.hubSounds, action.payload];
        storedState.hubSounds = updated;
        localStorage.setItem("app_state", JSON.stringify(storedState));
      } else {
        // sound is already added to the hub, we can put error logic here
        return;
      }
    },
    removeHubSound(state, action) {
      const storedState = JSON.parse(localStorage.getItem("app_state"));

      let currentSound = state.currentSounds.indexOf(
        state.currentSounds.find((sound) => sound.id === action.payload.id)
      );
      if (currentSound > -1) {
        state.currentSounds.splice(currentSound, 1);

        // remove the howl from global howler object
        removeHowl(action.payload.path);
        state.count = state.currentSounds.length;

        // update local storage with new sounds array
        storedState.hubSounds = state.currentSounds;
        localStorage.setItem("app_state", JSON.stringify(storedState));
      }
    },
  },
});

export const { addHubSound, removeHubSound } = hubSlice.actions;
export default hubSlice.reducer;
