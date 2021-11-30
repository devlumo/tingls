import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

      console.log(res.data);
      navigate("/");
    } catch (error) {
      setError("email or password is incorrect!");
    }
  };

  return (
    <div className="w-screen flex items-center justify-center flex-grow">
      <div className="w-1/5 p-5 flex flex-col space-y-4">
        <h2 className="text-purple-600 text-3xl">login</h2>
        <form
          className="flex flex-col items-center justify-center space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            className="p-2 border-purple-200 border-2 rounded-md focus:outline-none focus:border-purple-400 w-full"
            type="text"
            name="email"
            id="email"
            placeholder="email"
          />
          <input
            className="p-2 border-purple-200 border-2 rounded-md focus:outline-none focus:border-purple-400 w-full"
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <button
            type="submit"
            className="bg-purple-500 text-white rounded-md p-1 w-1/3 ml-auto hover:bg-purple-600"
          >
            login
          </button>
          <span className="text-red-400">{error ? `${error}` : ""}</span>
        </form>
      </div>
    </div>
  );
};

export default Login;
