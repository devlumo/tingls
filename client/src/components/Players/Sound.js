import React from "react";
import { useState, useEffect } from "react";
import useSound from "use-sound";

import findIcon from "../../utils/iconSort";
import { FaPlay, FaPause } from "react-icons/fa";
import {
  updateLocalStorage,
  checkLocalStorage,
} from "../../utils/updateLocalStorage";

const Sound = ({ id, name, path, stop }) => {
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
  }, [stop]);

  const playSound = () => {
    updateLocalStorage("playing", !playing, id);
    setPlaying(!playing);

    if (!playing) {
      sound.fade(0, volume, 2000);
      play();
      sound.loop();
    } else {
      sound.pause();
    }
  };

  const handleChange = (e) => {
    updateLocalStorage("volume", e.target.value, id);
    setVolume(e.target.value);
    sound.volume(e.target.value);
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md">
      {icon}
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">{name}</h1>
        <div className="mt-4 mb-4 flex flex-col items-center justify-center">
          <div className="flex flex-row mb-4 mt-4">
            <button onClick={playSound}>
              {playing ? <FaPause /> : <FaPlay />}
            </button>
          </div>
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
