import React from "react";
import ReactDom from "react-dom";
import axios from "axios";
import { motion } from "framer-motion/dist/framer-motion";
import { RiCloseLine } from "react-icons/ri";
import "./ModalStyles.scss";

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const app_state = JSON.parse(localStorage.getItem("app_state"));
      const data = JSON.stringify(app_state.hubSounds);

      if (!app_state.hubSounds.length) {
        throw new Error("There are no sounds added!");
      }

      const { name } = e.target.elements;

      const res = await axios.post(
        "http://127.0.0.1:8080/api/sounds/createMix",
        {
          name: name.value,
          data,
        },
        { withCredentials: true }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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
        <span className="close" onClick={onClose}>
          <RiCloseLine />
        </span>
        <div className="modal-header">
          <div className="modal-title">Save Tingl</div>
          <div className="modal-intro">
            Give your tingl a name and some tags!
          </div>
        </div>
        <div className="modal-inner">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Camping in the rain..."
              autoComplete="off"
            />
            <button className="save-btn" type="submit">
              Save
            </button>
          </form>
        </div>
      </motion.div>
    </div>,
    document.getElementById("portal")
  );
}

export default Modal;
