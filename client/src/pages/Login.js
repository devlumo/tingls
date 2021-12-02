import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";

const Login = () => {
  return (
    <div className="w-screen flex items-center justify-center flex-grow bg-gray-200 space-x-3">
      <LoginForm />
      <SignupForm />
    </div>
  );
};

export default Login;
