import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";
import { setEmail, setUsername } from "../../redux/auth";
import Input from "../Forms/Input";

const LoginForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
      navigate("/");
    } catch (error) {
      setError("email or password is incorrect!");
    }
  };

  return (
    <div className="w-1/5 p-5 flex flex-col space-y-4 rounded-lg shadow-md bg-white">
      <h2 className="text-purple-600 text-3xl">login</h2>
      <form
        className="flex flex-col items-center justify-center space-y-4"
        onSubmit={handleSubmit}
      >
        <Input type="email" name="email" />
        <Input type="password" name="password" />
        <button
          type="submit"
          className="bg-purple-500 text-white rounded-md p-1 w-1/3 ml-auto hover:bg-purple-600"
        >
          login
        </button>
        <span className="text-red-400">{error ? `${error}` : ""}</span>
      </form>
    </div>
  );
};

export default LoginForm;
