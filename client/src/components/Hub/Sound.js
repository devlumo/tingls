import React from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useState } from "react";
import useSound from "use-sound";
import { useDispatch, useSelector } from "react-redux";
import { removeHubSound, updateMute, updateVolume } from "../../redux/hub";
import { playAllHowls } from "../../utils/howlerUtils";

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

    dispatch(updateVolume({ id, volume: inputValue }));
    sound.volume(inputValue);
  };

  return (
    <div className="bg-white p-2 flex justify-center items-center m-2 text-black">
      {!muteStatus ? (
        <FaVolumeUp onClick={handleMute} />
      ) : (
        <FaVolumeMute onClick={handleMute} />
      )}
      <span className="text-sm p-1">{name}</span>
      <button className="text-sm p-1" onClick={handleRemove}>
        X
      </button>
      <input
        onClick={handlePlay}
        onChange={handleVolume}
        type="range"
        min="0"
        max="1"
        value={storedVolume}
        step="any"
      />
    </div>
  );
};

export default Sound;
