import React from "react";
import { useDispatch } from "react-redux";
import { loadMix } from "../../redux/hub";
import { motion } from "framer-motion/dist/framer-motion";
import "./MixItemStyles.scss";

const MixItem = ({ id, name, data }) => {
  const dispatch = useDispatch();

  const handleLoadMix = () => {
    dispatch(loadMix(data));
  };
  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.2 }}
      className="mix-item"
    >
      {name}
      <button onClick={handleLoadMix} className="">
        Add
      </button>
    </motion.div>
  );
};

export default MixItem;
