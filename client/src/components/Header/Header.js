import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setEmail, setUsername } from "../../redux/auth";
import { useEffect } from "react";
import Login from "./Login/Login";

import { motion } from "framer-motion/dist/framer-motion";

import "./HeaderStyles.scss";
import SignUp from "./SignUp/SignUp";

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
    <div className="header">
      <div className="logo">
        <Link to="/">✨ TINGLS.IO</Link>
      </div>
      <div className="header-menu">
        <ul className="menu">
          <li className="menu-item">
            {userName ? userName.toUpperCase() : <Login />}
          </li>
          <li className="menu-item">
            {userName ? userName.toUpperCase() : <SignUp />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
