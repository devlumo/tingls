import React from "react";

import "./VolumeStyles.scss";

const Volume = ({ handlePlay, handleVolume, storedVolume, rangeType }) => {
  return (
    <div className="volume-container">
      <div className="volume">
        <input
          onClick={handlePlay}
          onChange={handleVolume}
          type={rangeType}
          min="0"
          max="1"
          value={storedVolume}
          step="any"
        />
        <progress value={storedVolume} min="0" max="0"></progress>
      </div>
    </div>
  );
};

export default Volume;
