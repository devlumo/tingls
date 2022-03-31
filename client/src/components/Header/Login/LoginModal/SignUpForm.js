import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setEmail, setUsername, setID } from "../../../../redux/auth";
import axios from "axios";

const SignUpForm = ({ switchForm }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(setID(userData.user_id));
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <>
      <div className="modal-header">
        <div className="modal-title">Sign up</div>
        <div className="modal-intro">Create a free account with your email</div>
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
      <div className="modal-footer">
        <div className="sign-up-link" onClick={switchForm}>
          Already have an account? <b>Sign In!</b>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
