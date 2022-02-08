import React from "react";
import "./SideNavStyles.scss";

import { BsSoundwave } from "react-icons/bs";
import { TiSpiral } from "react-icons/ti";

import { motion } from "framer-motion/dist/framer-motion";

const SideNav = () => {
  return (
    <div className="nav">
      <div className="nav-header">MENU</div>
      <motion.div whileHover={{ x: 4 }} className="nav-item">
        <div className="icon-wrapper">
          <BsSoundwave />
        </div>
        <div className="item-text">SOUNDS</div>
      </motion.div>
      <motion.div whileHover={{ x: 4 }} className="nav-item">
        <div className="icon-wrapper">
          <TiSpiral />
        </div>
        <div className="item-text">MIXES</div>
      </motion.div>
    </div>
  );
};

export default SideNav;
