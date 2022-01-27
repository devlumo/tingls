import React from "react";
import { useState, useEffect } from "react";
import useSound from "use-sound";

import { updateGlobalPlay } from "../../redux/sounds";
import { useDispatch, useSelector } from "react-redux";

import findIcon from "../../utils/iconSort";
import {
  updateLocalStorage,
  checkLocalStorage,
} from "../../utils/updateLocalStorage";

const Sound = ({ id, name, path, stopped }) => {
  /* 
    - useSound gives us a function and the Howl from Howler
    - Howl methods can be called on the sound object
    - the path provided is the sound to be played, and we send options
    - state for the sounds is stored in localStorage, so check there
  */

  // on first render
  useEffect(() => {
    updateLocalStorage("playing", false, id);
  }, [id]);

  const [play, { sound }] = useSound(path, {
    volume: parseFloat(checkLocalStorage("volume", 0.5, id)),
  });

  const [playing, setPlaying] = useState(false);

  const [volume, setVolume] = useState(
    parseFloat(checkLocalStorage("volume", 0.5, id))
  );

  const dispatch = useDispatch();
  const globalPlay = useSelector((state) => state.sounds.globalPlay);
  const icon = findIcon(name);

  const playSound = () => {
    console.log(window.Howler);
    if (volume === 0) {
      // if there is no volume on this sound then just keep it paused
      setPlaying(false);
      sound.pause();
      updateLocalStorage("playing", playing, id);
      return;
    }

    if (!playing) {
      console.log("playing should now be set to", !playing);
      updateLocalStorage("playing", !playing, id);
      // dispatch(updateGlobalPlay(true));
      setPlaying(true);

      play();
      sound.loop(true);
    }
  };

  const handleChange = (e) => {
    let { value } = e.target;
    let inputValue = parseFloat(value);

    updateLocalStorage("volume", value, id);
    setVolume(inputValue);
    sound.volume(inputValue);
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md">
      {icon}
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">{name}</h1>
        <div className="mt-4 mb-4 flex flex-col items-center justify-center">
          <div className="flex flex-row mb-4 mt-4"></div>
          <div className="p-4">
            <input
              className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128 cursor"
              type="range"
              id="volume"
              name="volume"
              min="0"
              max="1"
              step="any"
              onChange={handleChange}
              onClick={playSound}
              defaultValue={volume}
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 uppercase">
        {playing ? "playing" : "paused"}
      </p>
      <button>Click</button>
    </div>
  );
};

export default Sound;
