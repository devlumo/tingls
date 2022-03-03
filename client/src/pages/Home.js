import React from "react";
import SoundList from "../components/Home/SoundList";

import "./HomeStyles.scss";

const Home = () => {
  return (
    <div className="main">
      <div className="discover-section">
        <SoundList />
      </div>
    </div>
  );
};

export default Home;
