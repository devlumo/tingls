import React from "react";
import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";
import Sound from "../Hub/Sound";

export const SoundHub = () => {
  const sounds = useSelector((state) => state.soundHub.currentSounds);
  return (
    <div className="bg-green-700 text-3xl text-white text-center fixed bottom-0 w-full flex-col justify-center items-center">
      Sound Hub Container
      <div className="flex justify-center items-center">
        Sounds
        {sounds.map((sound) => {
          return (
            <Sound
              key={sound.id}
              id={sound.id}
              name={sound.name}
              path={sound.path}
            />
          );
        })}
      </div>
    </div>
  );
};
