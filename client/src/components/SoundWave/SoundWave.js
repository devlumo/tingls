import React from "react";
import "./SoundWaveStyles.scss";

import { useSelector } from "react-redux";
const SoundWave = () => {
  const hubPlaying = useSelector((state) => state.soundHub.hubPlay);

  return (
    <div className="sound-wave">
      <span className={`stroke ${hubPlaying ? "animate" : null}`}></span>
      <span className={`stroke ${hubPlaying ? "animate" : null}`}></span>
      <span className={`stroke ${hubPlaying ? "animate" : null}`}></span>
      <span className={`stroke ${hubPlaying ? "animate" : null}`}></span>
      <span className={`stroke ${hubPlaying ? "animate" : null}`}></span>
      <span className={`stroke ${hubPlaying ? "animate" : null}`}></span>
      <span className={`stroke ${hubPlaying ? "animate" : null}`}></span>
    </div>
  );
};

export default SoundWave;
