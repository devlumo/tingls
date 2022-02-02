import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sound from "../Hub/Sound";
import { playAllHowls, pauseAllHowls } from "../../utils/howlerUtils";
import { updateHubPlaying } from "../../redux/hub";
import SaveMix from "../Mixes/SaveMix";

export const SoundHub = () => {
  const hubPlay = useSelector((state) => state.soundHub.hubPlay);
  const sounds = useSelector((state) => state.soundHub.currentSounds);
  const dispatch = useDispatch();

  const handleHubPlay = () => {
    if (!hubPlay) {
      dispatch(updateHubPlaying(true));
      playAllHowls();
    } else {
      dispatch(updateHubPlaying(false));
      pauseAllHowls();
    }
  };

  return (
    <div className="bg-green-700 text-md text-white text-center fixed bottom-0 w-full flex-col justify-center items-center">
      Hub
      <div className="flex justify-center items-center">
        Sounds
        {sounds.map((sound) => {
          return (
            <Sound
              key={sound.id}
              id={sound.id}
              name={sound.name}
              path={sound.path}
            />
          );
        })}
      </div>
      <div className="flex justify-center items-center">
        <button
          className="rounded text-sm bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white"
          onClick={handleHubPlay}
        >
          {hubPlay ? "Pause" : "Play"}
        </button>
        <SaveMix />
      </div>
    </div>
  );
};
