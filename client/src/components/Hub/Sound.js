import React from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useState } from "react";
import useSound from "use-sound";
import { MdClose } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { removeHubSound, updateMute, updateVolume } from "../../redux/hub";
import { playAllHowls } from "../../utils/howlerUtils";

import "./SoundStyles.scss";
import Volume from "./Volume/Volume";

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

    // updating howl volume and local storage
    dispatch(updateVolume({ id, volume: inputValue }));
    sound.volume(inputValue);
  };

  return (
    <div
      onHover
      className="sound"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        // backgroundColor: "rgba(0, 0, 0, 0.7)" /* Tint color */,
        // backgroundBlendMode: "multiply",
      }}
    >
      <div className="card-header">
        <BsThreeDots />
        <div className="sound-name">{name}</div>
        <MdClose className="remove" onClick={handleRemove} />
      </div>

      <div className="card-content"></div>
      <div className="card-footer">
        <div className="controls">
          <div className="mute">
            {!muteStatus ? (
              <FaVolumeUp onClick={handleMute} />
            ) : (
              <FaVolumeMute onClick={handleMute} />
            )}
          </div>
          <Volume
            handlePlay={handlePlay}
            handleVolume={handleVolume}
            storedVolume={storedVolume}
          />
        </div>
      </div>
    </div>
  );
};

export default Sound;
