import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import mandala from "../images/mandala.png";

import { useSelector, useDispatch } from "react-redux";
import { setEmail, setUsername } from "../redux/auth";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8080/api/auth/getSession",
          { withCredentials: true }
        );
        // TODO: IF STATEMENT
        const userData = res.data.userData;

        dispatch(setUsername(userData.username));
        dispatch(setEmail(userData.email));
      } catch (error) {
        return;
        //console.log(error);
      }
    };
    getUser();
  }, [dispatch]);
  const { userName } = useSelector((state) => state.user);
  return (
    <div className="bg-purple-500 h-16 w-screen p-4 flex justify-between items-center shadow-lg">
      <span className="text-white text-xl">
        <Link to="/">tingls.io</Link>
      </span>
      <ul className="flex space-x-8 text-white text-md pr-4">
        <li className="text-white text-md">
          {userName ? userName.toLowerCase() : <Link to="/login">login</Link>}
        </li>
        <li className="text-white text-md">about</li>
      </ul>
    </div>
  );
};

export default Header;
