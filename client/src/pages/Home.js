import React from "react";
import SoundList from "../components/Home/SoundList";

const Home = () => {
  return (
    <div className="w-screen flex-col items-center justify-center flex-grow bg-gray-200 text-center">
      Welcome to Tingls
      <SoundList />
    </div>
  );
};

export default Home;
