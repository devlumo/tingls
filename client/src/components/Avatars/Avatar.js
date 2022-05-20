import React from "react";
import "./AvatarStyle.scss";

const Avatar = ({ imagePath, bgColor }) => {
  return (
    <div
      className="avatar"
      style={bgColor ? { backgroundColor: bgColor } : null}
    >
      <img src={imagePath} alt="" />
    </div>
  );
};

export default Avatar;
