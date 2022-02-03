import React from "react";
import { useDispatch } from "react-redux";
import { loadMix } from "../../redux/hub";

const MixItem = ({ id, name, data }) => {
  const dispatch = useDispatch();

  const handleLoadMix = () => {
    dispatch(loadMix(data));
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      {name}
      <button
        onClick={handleLoadMix}
        className="bg-gray-400 float-right p-1 rounded-lg text-white"
      >
        Add
      </button>
    </div>
  );
};

export default MixItem;
