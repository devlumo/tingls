import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Sound from "../Hub/Sound";
import {
  playAllHowls,
  pauseAllHowls,
  getHowlCount,
} from "../../utils/howlerUtils";
import { updateHubPlaying } from "../../redux/hub";
import SaveMix from "../Mixes/SaveMix";

import { FaPlay, FaPause } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

import "./HubStyles.scss";

export const SoundHub = () => {
  const hubPlay = useSelector((state) => state.soundHub.hubPlay);
  const sounds = useSelector((state) => state.soundHub.currentSounds);
  const dispatch = useDispatch();

  const handleHubPlay = () => {
    if (!hubPlay && getHowlCount() > 0) {
      dispatch(updateHubPlaying(true));
      playAllHowls();
    } else {
      dispatch(updateHubPlaying(false));
      pauseAllHowls();
    }
  };

  return (
    <div className="hub">
      <div className="hub-header">
        <b>HUB</b>
      </div>
      <div className="sounds-container">
        {sounds.length < 1 ? (
          <div className="welcome-wrapper">
            <div className="welcome">
              <h2>Wecome to Tingls!</h2>
              <p>
                To get started add some sounds to create your own soundscape, or
                check what other people are listening to on the mixes tab
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
              />
            );
          })
        )}
      </div>
      <div className="hub-controls">
        <SaveMix />
        <div className="play-pause" onClick={handleHubPlay}>
          {hubPlay ? <FaPause /> : <FaPlay />}
        </div>
        <div className="icon">
          <HiOutlineDotsVertical />
        </div>
      </div>
    </div>
  );
};
