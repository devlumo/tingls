import React from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useState } from "react";
import useSound from "use-sound";
import { useDispatch, useSelector } from "react-redux";
import { removeHubSound, updateMute } from "../../redux/hub";

const Sound = ({ id, name, path }) => {
  const muteStatus = useSelector(
    (state) =>
      state.soundHub.currentSounds.find((sound) => sound.id === id).muted
  );
  const [muted, setMute] = useState(muteStatus);
  const dispatch = useDispatch();
  const [play, { sound }] = useSound(path, {
    volume: 0.5,
  });

  const handleMute = () => {
    if (!muted) {
      dispatch(updateMute({ path, id }));
      setMute(!muted);
      sound.mute(!muted);
    } else {
      dispatch(updateMute({ path, id }));
      setMute(!muted);
      sound.mute(!muted);
    }
  };

  const handleRemove = () => {
    sound.pause();
    dispatch(removeHubSound({ id, path }));
  };

  return (
    <div className="bg-white p4 flex justify-center items-center space-x-3 text-black">
      {!muted ? (
        <FaVolumeUp onClick={handleMute} />
      ) : (
        <FaVolumeMute onClick={handleMute} />
      )}
      <span className="text-sm">{name}</span>
      <button onClick={handleRemove}>X</button>
    </div>
  );
};

export default Sound;
