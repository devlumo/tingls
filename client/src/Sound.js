import React from "react";
import { useState, useRef } from "react";
import ReactHowler from "react-howler";
import { Howler } from "howler";

export const Sound = ({ name, path }) => {
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
    <div>
      <ReactHowler
        playing={playing}
        src={[path]}
        ref={player}
        volume={volume}
        loop={true}
      />
      <button onClick={playSound}>Play {name}</button>
      <button onClick={pauseSound}>Pause {name}</button>
      <input
        type="range"
        id="volume"
        name="volume"
        min="0"
        max="1"
        step="any"
        defaultValue="0.5"
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />
      <label htmlFor="volume">Volume</label>
      <button onClick={handleMute}>Mute</button>
      <p>{playing ? "playing" : "Not playing"}</p>
    </div>
  );
};
