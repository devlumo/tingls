import React from "react";
import MixList from "./MixList";

import "./MixContainerStyles.scss";

const MixContainer = () => {
  return (
    <div className="mix-container">
      <div className="mix-header">MIXES</div>
      <MixList />
    </div>
  );
};

export default MixContainer;
