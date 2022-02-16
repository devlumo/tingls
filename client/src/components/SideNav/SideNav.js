import React from "react";
import "./SideNavStyles.scss";

import { BsSoundwave } from "react-icons/bs";
import { TiSpiral } from "react-icons/ti";

import { motion } from "framer-motion/dist/framer-motion";

import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="nav">
      <div className="nav-header">MENU</div>
      <Link to="/">
        <motion.div whileHover={{ x: 2 }} className="nav-item">
          <div className="icon-wrapper">
            <BsSoundwave />
          </div>
          <div className="item-text">SOUNDS</div>
        </motion.div>
      </Link>
      <Link to="/mixes">
        <motion.div whileHover={{ x: 2 }} className="nav-item">
          <div className="icon-wrapper">
            <TiSpiral />
          </div>
          <div className="item-text">MIXES</div>
        </motion.div>
      </Link>
    </div>
  );
};

export default SideNav;
