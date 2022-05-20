import React from "react";
import { useState } from "react";
import useSound from "use-sound";
import { IoCloseOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import {
  removeHubSound,
  updateMute,
  updateVolume,
  updatePan,
} from "../../redux/hub";
import { playAllHowls } from "../../utils/howlerUtils";

import "./SoundStyles.scss";
import Volume from "./Volume/Volume";
import Controls from "./Controls/Controls";

const Sound = ({ id, name, path, imageUrl }) => {
  const dispatch = useDispatch();

  const muteStatus = useSelector(
    (state) =>
      state.soundHub.currentSounds.find((sound) => sound.id === id).muted
  );
  const storedVolume = useSelector(
    (state) =>
      state.soundHub.currentSounds.find((sound) => sound.id === id).volume
  );
  const storedPan = useSelector(
    (state) => state.soundHub.currentSounds.find((sound) => sound.id === id).pan
  );
  const hubPlaying = useSelector((state) => state.soundHub.hubPlay);
  const [playing, setPlaying] = useState(false);

  const [expand, setExpand] = useState(false);

  // useSound hook creates a new Howl Object and attaches it to the Howler Object
  // eslint-disable-next-line
  const [play, { sound }] = useSound(path, {
    volume: storedVolume,
    mute: muteStatus,
  });

  const handleMute = () => {
    if (!muteStatus) {
      dispatch(updateMute({ path, id }));
      sound.mute(!muteStatus);
    } else {
      dispatch(updateMute({ path, id }));
      sound.mute(!muteStatus);
    }
  };

  const handleRemove = () => {
    dispatch(removeHubSound({ id, path }));
  };

  const handlePlay = () => {
    // if the hub is already playing a sound and we add a new sound,
    // the slider can be clicked to start playing the newly added sound by calling playAllHowls()
    // this can only be triggered once due to playing being set

    if (hubPlaying) {
      if (!playing) {
        playAllHowls();
        setPlaying(!playing);
      }
    }
  };

  const handleVolume = (e) => {
    let inputValue = parseFloat(e.target.value);

    // updating howl volume and local storage
    dispatch(updateVolume({ id, volume: inputValue }));
    sound.volume(inputValue);
  };

  const handleExpand = () => {
    setExpand(!expand);
  };

  const handlePan = (e) => {
    let inputValue = parseFloat(e.target.value);

    dispatch(updatePan({ id, pan: inputValue }));
    sound.stereo(inputValue);
  };

  return (
    <div className={`sound ${name}`}>
      <div className="content">
        <div className="icon">
          <img src={imageUrl} alt="" />
          <div className="name">{name}</div>
        </div>
        <div className="end-section">
          <div className="volume-wrapper">
            <Volume
              handlePlay={handlePlay}
              handleVolume={handleVolume}
              storedVolume={storedVolume}
              rangeType="range"
            />
          </div>
          <div className="expand" onClick={handleExpand}>
            {expand ? <IoChevronUp /> : <IoChevronDown />}
          </div>
          <div className="close" onClick={handleRemove}>
            <IoCloseOutline />
          </div>
        </div>
      </div>
      <Controls
        handlePan={handlePan}
        storedPan={storedPan}
        isOpen={expand}
        handleMute={handleMute}
        id={id}
      />
    </div>
  );
};

export default Sound;
