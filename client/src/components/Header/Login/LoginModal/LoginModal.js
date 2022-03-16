import React from "react";
import ReactDom from "react-dom";
import { useState } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { RiCloseLine } from "react-icons/ri";
import "./LoginModalStyles.scss";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function LoginModal({ isOpen, onClose, signUp }) {
  const [switchForm, setSwitchForm] = useState(signUp);

  const handleSwitch = () => {
    setSwitchForm(!switchForm);
  };

  if (!isOpen) {
    return null;
  }

  return ReactDom.createPortal(
    <div className="modal-container">
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="overlay"
        onClick={onClose}
      ></motion.div>
      <motion.div
        key="modal"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.2 }}
        className="modal-content"
      >
        <span className="close" onClick={onClose}>
          <RiCloseLine />
        </span>
        {!switchForm ? (
          <LoginForm onClose={onClose} switchForm={handleSwitch} />
        ) : (
          <SignUpForm onClose={onClose} switchForm={handleSwitch} />
        )}
      </motion.div>
    </div>,
    document.getElementById("portal")
  );
}

export default LoginModal;
