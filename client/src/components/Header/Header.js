import React from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setEmail, setUsername, setID, setLikedSounds } from "../../redux/auth";
import { getUserData } from "../../api/api";
import { useEffect } from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

import "./HeaderStyles.scss";

const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getUserData();
        const userData = res.data.userData;
        dispatch(setUsername(userData.username));
        dispatch(setEmail(userData.email));
        dispatch(setID(userData.user_id));
        dispatch(setLikedSounds(userData.likedSounds));
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
          <li className="menu-item">{userName ? null : <Login />}</li>
          <li className="menu-item">
            {userName ? userName.toUpperCase() : <SignUp />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
