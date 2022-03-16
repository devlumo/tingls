import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setEmail, setUsername } from "../../../../redux/auth";
import axios from "axios";

const LoginForm = ({ onClose, switchForm }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = e.target.elements;

      const res = await axios.post(
        "http://127.0.0.1:8080/api/auth/login/",
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      );

      const userData = res.data.userData;

      dispatch(setUsername(userData.username));
      dispatch(setEmail(userData.email));
      onClose();
    } catch (error) {
      setError("Email or Password is incorrect!");
    }
  };

  return (
    <>
      <div className="modal-header">
        <div className="modal-title">Sign In</div>
        <div className="modal-intro">Enter your Username and Password</div>
        <div className="error">{error ? error : null}</div>
      </div>
      <div className="modal-inner">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
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
            Sign In
          </button>
        </form>
      </div>
      <div className="modal-footer">
        <div className="sign-up-link" onClick={switchForm}>
          Don't have an account? Sign Up!
        </div>
      </div>
    </>
  );
};

export default LoginForm;
