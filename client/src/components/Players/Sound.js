import React from "react";
import { useState, useRef } from "react";
import ReactHowler from "react-howler";

import icons from "../../utils/iconSort";
import { FaPlay, FaPause } from "react-icons/fa";

import { updateVolume } from "../../redux/sounds";
import { useSelector, useDispatch } from "react-redux";

const Sound = ({ id, name, path }) => {
  const player = useRef(null);
  const [playing, setPlaying] = useState(false);
  const soundData = useSelector((state) => state.sounds.sounds);

  const currentSound = soundData.find((sound) => sound._id === id);
  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    console.log(e.target.value);
    dispatch(updateVolume({ id, volume: e.target.value }));
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
            volume={currentSound.volume ? parseFloat(currentSound.volume) : 0.5}
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
              defaultValue={currentSound.volume ? currentSound.volume : "0.5"}
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
