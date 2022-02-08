import React from "react";
import SoundList from "../components/Home/SoundList";
import MixContainer from "../components/Mixes/MixContainer";

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
