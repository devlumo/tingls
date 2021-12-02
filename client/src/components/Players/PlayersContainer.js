import React, { useState, useEffect } from "react";
import axios from "axios";
import Sound from "./Sound";
import { saveSounds } from "../../redux/sounds";
import { useDispatch, useSelector } from "react-redux";

import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const globalSound = window.Howler;

const PlayersContainer = () => {
  const [loading, setLoading] = useState(true);
  const [mute, setMute] = useState(false);
  const [sounds, setSounds] = useState(null);
  const dispatch = useDispatch();
  const selectSounds = useSelector((state) => state.sounds);

  useEffect(() => {
    async function getSounds() {
      try {
        // check if sounds are stored already, if so we don't call the API
        if (selectSounds) {
          setSounds(selectSounds.sounds);
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:8080/api/sounds/", {
          withCredentials: true,
        });

        dispatch(saveSounds(res.data.sounds));
        setSounds(res.data.sounds);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getSounds();
  }, [dispatch, selectSounds]);

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
