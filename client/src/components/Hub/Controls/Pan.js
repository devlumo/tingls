import React from "react";

import "./PanStyles.scss";

const Pan = ({ handlePan, storedPan, rangeType }) => {
  return (
    <div className="volume-container">
      <div className="volume">
        <input
          onChange={handlePan}
          type={rangeType}
          min="-1"
          max="1"
          value={storedPan}
          step="any"
        />
        <progress min="0" max="0"></progress>
      </div>
    </div>
  );
};

export default Pan;
