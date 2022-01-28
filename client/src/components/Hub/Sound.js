import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useState } from "react";
import useSound from "use-sound";

const Sound = ({ id, name, path }) => {
  console.log(path);
  const [playing, setPlaying] = useState(false);
  const [play, { sound }] = useSound(path, {
    volume: 0.5,
  });

  const handlePlay = () => {
    if (!playing) {
      play();
      setPlaying(!playing);
    } else {
      sound.pause();
      setPlaying(!playing);
    }
  };

  return (
    <div
      onClick={handlePlay}
      className="bg-white p4 flex justify-center items-center space-x-3 text-black"
    >
      {!playing ? <FaPlay /> : <FaPause />}
      <span className="text-sm">{name}</span>
    </div>
  );
};

export default Sound;
