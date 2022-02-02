import React from "react";
import SoundList from "../components/Home/SoundList";
import MixContainer from "../components/Mixes/MixContainer";

const Home = () => {
  return (
    <div className="w-screen flex space-x-3 items-center justify-center flex-grow bg-gray-200 text-center">
      <SoundList />
      <MixContainer />
    </div>
  );
};

export default Home;
