import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useState } from "react";
import useSound from "use-sound";
import { useDispatch } from "react-redux";
import { removeHubSound } from "../../redux/hub";

const Sound = ({ id, name, path }) => {
  const [playing, setPlaying] = useState(false);
  const dispatch = useDispatch();
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

  const handleRemove = () => {
    sound.pause();
    dispatch(removeHubSound({ id, path }));
  };

  return (
    <div className="bg-white p4 flex justify-center items-center space-x-3 text-black">
      {!playing ? (
        <FaPlay onClick={handlePlay} />
      ) : (
        <FaPause onClick={handlePlay} />
      )}
      <span className="text-sm">{name}</span>
      <button onClick={handleRemove}>X</button>
    </div>
  );
};

export default Sound;
