import React from "react";
import ReactDom from "react-dom";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setEmail, setUsername } from "../../../../redux/auth";
import axios from "axios";
import { motion } from "framer-motion/dist/framer-motion";
import { RiCloseLine } from "react-icons/ri";
import "./SignUpModalStyles.scss";

function SignUpModal({ isOpen, onClose }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { username, fullname, email, password } = e.target.elements;

      const res = await axios.post(
        "http://127.0.0.1:8080/api/auth/signup/",
        {
          userName: username.value,
          fullName: fullname.value,
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      );

      const userData = res.data.userData;
      dispatch(setUsername(userData.username));
      dispatch(setEmail(userData.email));
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
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
          <div className="modal-title">Sign up</div>
          <div className="modal-intro">
            Create a free account with your email
          </div>
          <div className="error">{error ? error : null}</div>
        </div>
        <div className="modal-inner">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Full name"
              autoComplete="off"
            />
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              autoComplete="off"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="off"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
            />
            <button className="save-btn" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </motion.div>
    </div>,
    document.getElementById("portal")
  );
}

export default SignUpModal;
