import React from "react";
import SoundList from "../components/Home/SoundList";

import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    if (!localStorage.getItem("app_state")) {
      localStorage.setItem(
        "app_state",
        JSON.stringify({
          hubSounds: [],
          hubPlay: false,
        })
      );
    }
  });

  return (
    <div className="w-screen flex-col items-center justify-center flex-grow bg-gray-200 text-center">
      Welcome to Tingls
      <SoundList />
    </div>
  );
};

export default Home;
