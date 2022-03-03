import React from "react";
import "./PlayerStyles.scss";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion/dist/framer-motion";
import {
  playAllHowls,
  pauseAllHowls,
  getHowlCount,
} from "../../utils/howlerUtils";

import { updateHubPlaying, clearHub } from "../../redux/hub";
import SaveMix from "../Mixes/SaveMix";

import { FaPlay, FaPause } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const Player = () => {
  const hubPlay = useSelector((state) => state.soundHub.hubPlay);
  const dispatch = useDispatch();

  const handleHubPlay = () => {
    if (!hubPlay && getHowlCount() > 0) {
      dispatch(updateHubPlaying(true));
      playAllHowls();
    } else {
      dispatch(updateHubPlaying(false));
      pauseAllHowls();
    }
  };

  const handleClear = () => {
    dispatch(clearHub());
  };

  return (
    <div className="player">
      <div className="player-wrap">
        <div className="left-section">Left</div>
        <div className="middle-section">
          <div className="play-pause" onClick={handleHubPlay}>
            {hubPlay ? <FaPause /> : <FaPlay />}
          </div>
        </div>
        <div className="right-section">
          <motion.div
            className="clear-hub"
            onClick={handleClear}
            whileTap={{ scale: 0.9 }}
          >
            <RiDeleteBinLine />
          </motion.div>
          <SaveMix />
        </div>
      </div>
    </div>
  );
};

export default Player;
