import React, { useState, useEffect } from "react";
import axios from "axios";
import Sound from "./Sound";
import { saveSounds } from "../../redux/sounds";
import { useDispatch } from "react-redux";

import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const globalSound = window.Howler;

const PlayersContainer = () => {
  const [loading, setLoading] = useState(true);
  const [mute, setMute] = useState(false);
  const [sounds, setSounds] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getSounds() {
      try {
        const res = await axios.get("http://localhost:8080/api/sounds/", {
          withCredentials: true,
        });

        const updateSounds = res.data.sounds;
        updateSounds.forEach((sound) => {
          sound.volume = 0.5;
          sound.playing = false;
        });

        dispatch(saveSounds(updateSounds));
        setSounds(updateSounds);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getSounds();
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
        sounds.map((el) => {
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
