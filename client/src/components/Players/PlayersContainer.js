import React, { useState, useEffect } from "react";
import Sound from "./Sound";
import { getSounds } from "../../redux/sounds";
import { useDispatch, useSelector } from "react-redux";

import { FaVolumeMute, FaVolumeUp, FaStop, FaPlay } from "react-icons/fa";
import { updateLocalStorage } from "../../utils/updateLocalStorage";

const PlayersContainer = () => {
  const [loading, setLoading] = useState(true);
  const [mute, setMute] = useState(false);
  const [stop, setStop] = useState(true);
  const dispatch = useDispatch();
  const selectSounds = useSelector((state) => state.sounds);

  useEffect(() => {
    dispatch(getSounds());
    setLoading(false);
  }, [dispatch]);

  const handleMute = () => {
    setMute(!mute);
    window.Howler.mute(!mute);
  };

  const handleStop = () => {
    updateLocalStorage("playing", !stop);
    setStop(!stop);
    //globalSoundHandler.stop(!stop);
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      {loading ? (
        <p>Loading</p>
      ) : (
        selectSounds.sounds.map((el) => {
          return (
            <Sound
              key={el._id}
              id={el._id}
              name={el.name}
              path={el.path}
              stop={stop}
            />
          );
        })
      )}
      <button onClick={handleMute}>
        {mute ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
      <button onClick={handleStop}>{stop ? <FaPlay /> : <FaStop />}</button>
    </div>
  );
};

export default PlayersContainer;
