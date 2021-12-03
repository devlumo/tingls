import React, { useState, useEffect } from "react";
//import axios from "axios";
import Sound from "./Sound";
import { getSounds } from "../../redux/sounds";
import { useDispatch, useSelector } from "react-redux";

import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const globalSound = window.Howler;

const PlayersContainer = () => {
  const [loading, setLoading] = useState(true);
  const [mute, setMute] = useState(false);
  //const [sounds, setSounds] = useState(null);
  const dispatch = useDispatch();
  const selectSounds = useSelector((state) => state.sounds);

  useEffect(() => {
    dispatch(getSounds());
    setLoading(false);
  }, [dispatch]);

  const handleMute = () => {
    setMute(!mute);
    globalSound.mute(!mute);
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      {loading ? (
        <p>Loading</p>
      ) : (
        selectSounds.sounds.map((el) => {
          return (
            <Sound key={el._id} id={el._id} name={el.name} path={el.path} />
          );
        })
      )}
      <button onClick={handleMute}>
        {mute ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default PlayersContainer;
