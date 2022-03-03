import { createSlice } from "@reduxjs/toolkit";
import {
  pauseHowl,
  removeHowl,
  removeAllHowls,
  pauseAllHowls,
  removePreviousHowls,
} from "../utils/howlerUtils";

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
storedState.hubPlay = false;
localStorage.setItem("app_state", JSON.stringify(storedState));

const initialState = {
  currentSounds: [...storedState.hubSounds],
  hubPlay: false,
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

        // pause & remove the howl from global howler object
        pauseHowl(action.payload.path);
        removeHowl(action.payload.path);
        state.count = state.currentSounds.length;

        // if there are no sounds in the hubPlay to false
        if (state.count < 1) {
          storedState.hubSounds = state.currentSounds;
          storedState.hubPlay = false;
          state.hubPlay = false;

          localStorage.setItem("app_state", JSON.stringify(storedState));
        } else {
          // update local storage with new sounds array
          storedState.hubSounds = state.currentSounds;
          localStorage.setItem("app_state", JSON.stringify(storedState));
        }
      }
    },

    updateMute(state, action) {
      // get the stored state and check if the current sound exists there
      const storedState = JSON.parse(localStorage.getItem("app_state"));
      const currentSound = storedState.hubSounds.find(
        (sound) => sound.id === action.payload.id
      );

      // set the muted status toggle
      if (!currentSound.muted) {
        currentSound.muted = true;
      } else {
        currentSound.muted = false;
      }

      // getting the index of the redux state to update
      let currentIndex = state.currentSounds.indexOf(
        state.currentSounds.find((sound) => sound.id === action.payload.id)
      );

      if (currentIndex > -1) {
        state.currentSounds.splice(currentIndex, 1, currentSound);

        // update local storage with new sounds array
        storedState.hubSounds = state.currentSounds;
        localStorage.setItem("app_state", JSON.stringify(storedState));
      }
    },

    updateVolume(state, action) {
      const storedState = JSON.parse(localStorage.getItem("app_state"));
      const currentSound = storedState.hubSounds.find(
        (sound) => sound.id === action.payload.id
      );

      currentSound.volume = action.payload.volume;

      let currentIndex = state.currentSounds.indexOf(
        state.currentSounds.find((sound) => sound.id === action.payload.id)
      );

      if (currentIndex > -1) {
        state.currentSounds.splice(currentIndex, 1, currentSound);

        // update local storage with new sounds array
        storedState.hubSounds = state.currentSounds;
        localStorage.setItem("app_state", JSON.stringify(storedState));
      }
    },

    updateHubPlaying(state, action) {
      const storedState = JSON.parse(localStorage.getItem("app_state"));
      storedState.hubPlay = action.payload;
      state.hubPlay = action.payload;
      localStorage.setItem("app_state", JSON.stringify(storedState));
    },

    loadMix(state, action) {
      pauseAllHowls();
      removePreviousHowls(JSON.parse(action.payload));
      const storedState = JSON.parse(localStorage.getItem("app_state"));
      storedState.hubPlay = false;
      state.hubPlay = false;

      storedState.hubSounds = JSON.parse(action.payload);
      state.currentSounds = JSON.parse(action.payload);

      localStorage.setItem("app_state", JSON.stringify(storedState));
    },

    clearHub(state, action) {
      removeAllHowls();
      localStorage.setItem(
        "app_state",
        JSON.stringify({
          hubSounds: [],
          hubPlay: false,
        })
      );
      state.currentSounds = [];
      state.hubPlay = false;
      state.count = 0;
    },
  },
});

export const {
  addHubSound,
  removeHubSound,
  updateMute,
  updateVolume,
  updateHubPlaying,
  loadMix,
  clearHub,
} = hubSlice.actions;
export default hubSlice.reducer;
