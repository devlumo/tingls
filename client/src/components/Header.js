import React from "react";
import { Link } from "react-router-dom";

import mandala from "../images/mandala.png";

const Header = () => {
  return (
    <div className="bg-purple-500 h-16 w-screen p-4 flex justify-between items-center shadow-lg">
      <span className="text-white text-xl">
        <Link to="/">tingls.io</Link>
      </span>
      <span>
        <img src={mandala} alt="oops" className="w-12 h-12 shadow-2xl"></img>
      </span>
      <ul className="flex space-x-8 text-white text-md pr-4">
        <li className="text-white text-md">
          <Link to="/login">login</Link>
        </li>
        <li className="text-white text-md">about</li>
      </ul>
    </div>
  );
};

export default Header;