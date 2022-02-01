import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
import Sound from "../Hub/Sound";
import { playAllHowls, pauseAllHowls } from "../../utils/howlerUtils";
import { updateHubPlaying } from "../../redux/hub";

export const SoundHub = () => {
  const [globalPlay, setGlobalPlay] = useState(false);
  const sounds = useSelector((state) => state.soundHub.currentSounds);
  const dispatch = useDispatch();

  const handleGlobalPlay = () => {
    if (!globalPlay) {
      setGlobalPlay(true);
      dispatch(updateHubPlaying(true));
      playAllHowls();
    } else {
      setGlobalPlay(false);
      dispatch(updateHubPlaying(false));
      pauseAllHowls();
    }
  };

  return (
    <div className="bg-green-700 text-3xl text-white text-center fixed bottom-0 w-full flex-col justify-center items-center">
      Sound Hub Container
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
      <button onClick={handleGlobalPlay}>
        {globalPlay ? "Pause" : "Play"}
      </button>
    </div>
  );
};
