import React from "react";
import { useState } from "react";
import { Howl } from "howler";

export const Sound = ({ name, path }) => {
  const [playing, setPlaying] = useState(false);

  const Sound = new Howl({
    src: [path],
  });

  const playSound = (path) => {
    setPlaying(true);
    Sound.play();
  };

  return (
    <div>
      <button onClick={() => playSound(path)}>{name}</button>
      <button onClick={() => playSound(path)}>{name}</button>
      <p>{playing ? "playing" : "Not playing"}</p>
    </div>
  );
};
