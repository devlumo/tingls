import React from "react";
import { useState, useEffect } from "react";
import useSound from "use-sound";

import findIcon from "../../utils/iconSort";
import {
  updateLocalStorage,
  checkLocalStorage,
} from "../../utils/updateLocalStorage";

const Sound = ({ id, name, path, stop }) => {
  // initialise sound and volume
  // we store state in local storage so check there
  const [play, { sound }] = useSound(path, {
    volume: parseFloat(checkLocalStorage("volume", 0.5, id)),
  });

  const [playing, setPlaying] = useState(
    checkLocalStorage("playing", false, id)
  );

  const [volume, setVolume] = useState(
    parseFloat(checkLocalStorage("volume", 0.5, id))
  );

  const icon = findIcon(name);

  useEffect(() => {
    stop ? setPlaying(false) : setPlaying(true);
  }, [stop, sound]);

  const playSound = () => {
    if (volume === 0) {
      setPlaying(false);
      updateLocalStorage("playing", playing, id);
      return;
    }

    if (!playing) {
      // sound.fade(0, volume, 2000);
      console.log(playing);
      updateLocalStorage("playing", !playing, id);
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

    if (inputValue === 0) {
      setPlaying(false);
      updateLocalStorage("playing", playing, id);
      sound.pause();
    }
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
