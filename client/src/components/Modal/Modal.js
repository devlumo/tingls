import React from "react";
import ReactDom from "react-dom";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import "./ModalStyles.scss";

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // we render out to an element called "portal" rather than root to avoid overlapping DOM elements
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
        Modal
        <button onClick={onClose}>close</button>
      </motion.div>
    </div>,
    document.getElementById("portal")
  );
}

export default Modal;
