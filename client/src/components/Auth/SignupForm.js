import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";
import { setEmail, setUsername } from "../../redux/auth";
import Input from "../Forms/Input";

const SignupForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { username, email, password, firstname, lastname, dateofbirth } =
        e.target.elements;

      const formatDate = dateofbirth.value.toLocaleString();
      const res = await axios.post(
        "http://127.0.0.1:8080/api/auth/signup/",
        {
          userName: username.value,
          email: email.value,
          password: password.value,
          firstName: firstname.value,
          lastName: lastname.value,
          dob: formatDate,
        },
        { withCredentials: true }
      );

      console.log(res);

      const userData = res.data.userData;

      dispatch(setUsername(userData.username));
      dispatch(setEmail(userData.email));
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="w-1/5 p-5 flex flex-col space-y-4 rounded-lg shadow-md bg-white">
      <h2 className="text-purple-600 text-3xl">create account</h2>
      <form
        className="flex flex-col items-center justify-center space-y-4"
        onSubmit={handleSubmit}
      >
        <Input type="text" name="username" />
        <Input type="email" name="email" />
        <Input type="password" name="password" />
        <Input type="text" name="firstname" />
        <Input type="text" name="lastname" />
        <Input type="date" name="dateofbirth" />
        <button
          type="submit"
          className="bg-purple-500 text-white rounded-md p-1 w-1/3 ml-auto hover:bg-purple-600"
        >
          signup
        </button>
        <span className="text-red-400">{error ? `${error}` : ""}</span>
      </form>
    </div>
  );
};

export default SignupForm;
