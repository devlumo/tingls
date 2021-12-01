import React from "react";
import { useState, useRef } from "react";
import ReactHowler from "react-howler";
import icons from "../../utils/iconSort";
import { FaPlay, FaPause } from "react-icons/fa";

const Sound = ({ name, path }) => {
  const player = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  let icon = icons.find((icon) => icon.name === name);
  if (!icon) {
    icon = icons.find((icon) => icon.name === "default");
  }
  //const [duration, setDuration] = useState(null);

  const playSound = () => {
    setPlaying(!playing);
    // take the extra methods off the current object which is referenced
    //setDuration(player.current.seek());
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md">
      {icon.component}
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
              defaultValue="0.5"
              onChange={(e) => setVolume(parseFloat(e.target.value))}
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
