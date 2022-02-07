import React from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHubSound, removeHubSound } from "../../redux/hub";
import { playAllHowls } from "../../utils/howlerUtils";

import { BsSoundwave } from "react-icons/bs";
import { motion } from "framer-motion/dist/framer-motion";

import "./SoundItemStyles.scss";

export const SoundItem = ({ id, name, path }) => {
  // to check if the sound is added to the hub, check if it is stored and evaluate it to a boolean
  const added = Boolean(
    useSelector((state) =>
      state.soundHub.currentSounds.find((sound) => sound.id === id)
    )
  );

  const hubPlaying = useSelector((state) => state.soundHub.hubPlay);
  const dispatch = useDispatch();

  // add the sound object to the Hub
  const addToHub = () => {
    const soundObject = {
      id,
      path,
      name,
      volume: 0,
    };

    dispatch(addHubSound(soundObject));

    // only auto play the added sound if the hub is playing others
    if (hubPlaying) {
      playAllHowls();
    }
  };

  // remove sounds from the Hub
  const removeFromHub = () => {
    dispatch(removeHubSound({ id, path }));
  };

  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.2 }}
      className="sound-item"
    >
      <BsSoundwave />
      {name}
      {!added ? (
        <button onClick={addToHub} className="">
          Add
        </button>
      ) : (
        <button onClick={removeFromHub} className="">
          Remove
        </button>
      )}
    </motion.div>
  );
};
