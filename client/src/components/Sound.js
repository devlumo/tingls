import React from "react";
import { useState, useRef } from "react";
import ReactHowler from "react-howler";
import { Howler } from "howler";
import { FaPlay, FaCloudRain, FaPause, FaVolumeMute } from "react-icons/fa";

const Sound = ({ name, path }) => {
  const player = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  //const [duration, setDuration] = useState(null);

  const playSound = () => {
    setPlaying(true);
    // take the extra methods off the current object which is referenced
    //setDuration(player.current.seek());
  };

  const pauseSound = () => {
    setPlaying(false);
  };

  const handleMute = () => {
    setMuted(!muted);
    Howler.mute(!muted);
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md">
      <FaCloudRain className="mb-4 text-green-600 text-2xl" />
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
          <div className="flex flex-row space-x-3 mb-4 mt-4">
            <button onClick={playSound}>
              <FaPlay />
            </button>
            <button onClick={pauseSound}>
              <FaPause />
            </button>
          </div>
          <div className="p-4">
            <input
              className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128"
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
          <button className="text-2xl" onClick={handleMute}>
            <FaVolumeMute />
          </button>
        </div>
      </div>

      <p>{playing ? "playing" : "Not playing"}</p>
    </div>
  );
};

export default Sound;
