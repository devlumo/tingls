import React from "react";

const Input = ({ type, name }) => {
  return (
    <>
      <input
        className="p-2 border-purple-200 border-2 rounded-md focus:outline-none focus:border-purple-400 w-full"
        type={type}
        name={name}
        placeholder={name}
      />
    </>
  );
};

export default Input;
