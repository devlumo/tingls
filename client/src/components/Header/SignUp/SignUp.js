import React from "react";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import { useState } from "react";
import "./SignUpStyles.scss";

const SignUp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        onClick={handleModalOpen}
        className="sign-up"
      >
        Sign Up
      </motion.button>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {
          // anything inside AnimatePresence will not remove from the DOM until
          // animations are complete
          // isOpen && <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        }
      </AnimatePresence>
    </>
  );
};

export default SignUp;
