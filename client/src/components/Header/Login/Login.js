import React from "react";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import { useState } from "react";
import "./LoginStyles.scss";
import LoginModal from "./LoginModal/LoginModal";

const Login = () => {
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
        className="login"
      >
        Sign In
      </motion.button>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {
          // anything inside AnimatePresence will not remove from the DOM until
          // animations are complete
          isOpen && (
            <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
          )
        }
      </AnimatePresence>
    </>
  );
};

export default Login;
