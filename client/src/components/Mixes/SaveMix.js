import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import { useSelector } from "react-redux";

import Modal from "../Modal/Modal";

import "./SaveMixStyles.scss";
import LoginModal from "../Header/Login/LoginModal/LoginModal";

const SaveMix = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sounds = useSelector((state) => state.soundHub.currentSounds);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const { userName } = useSelector((state) => state.user);
  return (
    <>
      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        onClick={handleModalOpen}
        className="save"
        disabled={Boolean(!sounds.length)}
      >
        Save
      </motion.button>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {
          // anything inside AnimatePresence will not remove from the DOM until
          // animations are complete
          isOpen && userName ? (
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
          ) : (
            <LoginModal
              isOpen={isOpen}
              signUp={true}
              onClose={() => setIsOpen(false)}
            />
          )
        }
      </AnimatePresence>
    </>
  );
};

export default SaveMix;
