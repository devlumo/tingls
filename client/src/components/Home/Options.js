import React from "react";

import { FaHeart, FaArrowRight, FaStar } from "react-icons/fa";
import "./OptionsStyles.scss";

const Options = () => {
  return (
    <div className="options">
      <div className="option">
        <FaHeart />
      </div>
      <div className="option">
        <FaStar />
      </div>
      <div className="option">
        <FaArrowRight />
      </div>
    </div>
  );
};

export default Options;
