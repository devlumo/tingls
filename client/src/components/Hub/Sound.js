import React from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useState } from "react";
import useSound from "use-sound";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import { TiTimes } from "react-icons/ti";

import { useDispatch, useSelector } from "react-redux";
import { removeHubSound, updateMute, updateVolume } from "../../redux/hub";
import { playAllHowls } from "../../utils/howlerUtils";
import { motion } from "framer-motion/dist/framer-motion";

import "./SoundStyles.scss";

const Sound = ({ id, name, path }) => {
  const dispatch = useDispatch();

  const muteStatus = useSelector(
    (state) =>
      state.soundHub.currentSounds.find((sound) => sound.id === id).muted
  );
  const storedVolume = useSelector(
    (state) =>
      state.soundHub.currentSounds.find((sound) => sound.id === id).volume
  );
  const hubPlaying = useSelector((state) => state.soundHub.hubPlay);
  const [playing, setPlaying] = useState(false);

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

    // for progress slider
    const min = e.target.min;
    const max = e.target.max;
    const val = e.target.value;

    e.target.style.backgroundSize =
      ((val - min) * 100) / (max - min) + "% 100%";

    // updating howl volume and local storage
    dispatch(updateVolume({ id, volume: inputValue }));
    sound.volume(inputValue);
  };

  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.2 }}
      className="sound"
    >
      <div className="card-header">
        Nature
        <HiOutlineDotsVertical className="icon" />
      </div>

      <div className="card-content">
        <div className="sound-name">{name}</div>
        <div className="controls">
          <div className="mute">
            {!muteStatus ? (
              <FaVolumeUp onClick={handleMute} />
            ) : (
              <FaVolumeMute onClick={handleMute} />
            )}
          </div>
          <input
            onClick={handlePlay}
            className="volume"
            onChange={handleVolume}
            type="range"
            min="0"
            max="1"
            value={storedVolume}
            step="any"
          />
        </div>
      </div>
      <div className="card-footer">
        <AiFillHeart />
        <TiTimes className="remove" onClick={handleRemove} />
      </div>
    </motion.div>
  );
};

export default Sound;
