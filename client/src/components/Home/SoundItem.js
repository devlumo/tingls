import React from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHubSound, removeHubSound } from "../../redux/hub";
import { playAllHowls } from "../../utils/howlerUtils";

export const SoundItem = ({ id, name, path }) => {
  // to check if the sound is added to the hub, check if it is stored and evaluate it to a boolean
  const added = Boolean(
    useSelector((state) =>
      state.soundHub.currentSounds.find((sound) => sound.id === id)
    )
  );

  const hubPlaying = useSelector((state) => state.soundHub.hubPlay);
  const dispatch = useDispatch();

  // add the sound object to the Hub
  const addToHub = () => {
    const soundObject = {
      id,
      path,
      name,
      volume: 0,
    };

    dispatch(addHubSound(soundObject));

    // only auto play the added sound if the hub is playing others
    if (hubPlaying) {
      playAllHowls();
    }
  };

  // remove sounds from the Hub
  const removeFromHub = () => {
    dispatch(removeHubSound({ id, path }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-1/5">
      {name}
      {!added ? (
        <button
          onClick={addToHub}
          className="bg-gray-400 float-right p-1 rounded-lg text-white"
        >
          Add
        </button>
      ) : (
        <button
          onClick={removeFromHub}
          className="bg-red-400 float-right p-1 rounded-lg text-white"
        >
          Remove
        </button>
      )}
    </div>
  );
};
