import React from "react";
import { useState, useRef } from "react";
import ReactHowler from "react-howler";

import findIcon from "../../utils/iconSort";
import { FaPlay, FaPause } from "react-icons/fa";
import updateLocalStorage from "../../utils/updateLocalStorage";

const Sound = ({ id, name, path }) => {
  const player = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const icon = findIcon(name);

  const playSound = () => {
    setPlaying(!playing);
    // take the extra methods off the current object which is referenced
    //setDuration(player.current.seek());
  };

  const handleChange = (e) => {
    updateLocalStorage("volume", e.target.value, id);
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md">
      {icon}
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">{name}</h1>
        <div className="mt-4 mb-4 flex flex-col items-center justify-center">
          <ReactHowler
            playing={playing}
            src={[path]}
            ref={player}
            volume={volume}
            loop={true}
          />
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
              defaultValue="0.5"
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 uppercase">
        {playing ? "playing" : "paused"}
      </p>
    </div>
  );
};

export default Sound;
