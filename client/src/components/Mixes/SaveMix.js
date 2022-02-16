import React from "react";
import axios from "axios";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

import Modal from "../Modal/Modal";

import "./SaveMixStyles.scss";

const SaveMix = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    try {
      const app_state = JSON.parse(localStorage.getItem("app_state"));
      const data = JSON.stringify(app_state.hubSounds);

      if (!app_state.hubSounds.length) {
        throw new Error("There are no sounds added!");
      }

      // TODO: MODAL
      const name = "Test1";

      const res = await axios.post(
        "http://127.0.0.1:8080/api/sounds/createMix",
        {
          name,
          data,
        },
        { withCredentials: true }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleModalOpen}
        className="save"
      >
        Save Tingl
      </motion.button>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {
          // anything inside AnimatePresence will not remove from the DOM until
          // animations are complete
          isOpen && <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        }
      </AnimatePresence>
    </>
  );
};

export default SaveMix;
