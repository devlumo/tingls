import React from "react";
import { useRef } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { useSelector } from "react-redux";

import Pan from "./Pan";
import "./ControlsStyles.scss";
import { FaClock, FaHeart, FaShare, FaVolumeMute } from "react-icons/fa";

const Controls = ({ handlePan, storedPan, isOpen, handleMute, id }) => {
  const parentRef = useRef();

  const muteStatus = useSelector(
    (state) =>
      state.soundHub.currentSounds.find((sound) => sound.id === id).muted
  );
  return (
    <div
      className="ctrls-wrap"
      ref={parentRef}
      style={
        isOpen
          ? { height: parentRef.current.scrollHeight + "px" }
          : { height: "0px" }
      }
    >
      <div className="ctrls">
        <div className="left-section">
          <span className="info">PAN</span>
          <div className="pan-wrap">
            <span className="indicator">L</span>
            <Pan
              handlePan={handlePan}
              storedPan={storedPan}
              rangeType="range"
            />
            <span className="indicator">R</span>
          </div>
        </div>
        <div className="right-section">
          <div className="info">MORE</div>
          <div className="more-wrap">
            <motion.div className="option" whileTap={{ scale: 0.9 }}>
              <FaHeart />
            </motion.div>
            <motion.div className="option" whileTap={{ scale: 0.9 }}>
              <FaClock />
            </motion.div>
            <motion.div
              className={muteStatus ? "option mute" : "option"}
              onClick={handleMute}
              whileTap={{ scale: 0.9 }}
            >
              <FaVolumeMute />
            </motion.div>
            <motion.div className="option" whileTap={{ scale: 0.9 }}>
              <FaShare />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
