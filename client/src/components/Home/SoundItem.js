import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHubSound, removeHubSound } from "../../redux/SoundHub";

export const SoundItem = ({ id, name, path }) => {
  const dispatch = useDispatch();

  const addToHub = () => {
    const soundObject = {
      id,
      path,
      name,
    };
    dispatch(addHubSound(soundObject));
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-1/5">
      {name}
      <button
        onClick={addToHub}
        className="bg-gray-400 float-right p-1 rounded-lg text-white"
      >
        Add
      </button>
    </div>
  );
};
