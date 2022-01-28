import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Sound from "../Hub/Sound";

export const SoundHub = () => {
  const sounds = useSelector((state) => state.soundHub.currentSounds);
  return (
    <div className="bg-green-700 text-3xl text-white text-center fixed bottom-0 w-full">
      Sound Hub Container
      <div>
        Sounds
        {sounds.map((sound) => {
          console.log(sound);
          return <Sound key={sound} id={sound} />;
        })}
      </div>
    </div>
  );
};
