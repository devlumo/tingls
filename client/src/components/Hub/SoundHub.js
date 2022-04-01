import React from "react";
import { useSelector } from "react-redux";
import Sound from "../Hub/Sound";
import { AnimatePresence } from "framer-motion/dist/framer-motion";

import "./HubStyles.scss";

export const SoundHub = () => {
  const sounds = useSelector((state) => state.soundHub.currentSounds);

  console.log(sounds);
  return (
    <div className="hub">
      <div className="hub-header">
        <b>HUB</b>
      </div>
      <AnimatePresence initial={true}>
        <div className="sounds-container">
          {sounds.length < 1 ? (
            <div className="welcome-wrapper">
              <div className="welcome">
                <h2>No sounds added!</h2>
                <p>
                  To get started add some sounds to create your own soundscape,
                  or check out other creations on the mixes tab!
                </p>
              </div>
            </div>
          ) : (
            sounds.map((sound) => {
              return (
                <Sound
                  key={sound.id}
                  id={sound.id}
                  name={sound.name}
                  path={sound.path}
                  imageUrl={sound.imageUrl}
                />
              );
            })
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};
