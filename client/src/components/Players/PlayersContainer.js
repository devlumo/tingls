import React, { useState, useEffect } from "react";
import axios from "axios";
import Sound from "./Sound";

import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const globalSound = window.Howler;

const PlayersContainer = () => {
  const [sounds, setSounds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    async function getSounds() {
      try {
        const res = await axios.get("http://localhost:8080/api/sounds/", {
          withCredentials: true,
        });

        setSounds(res.data.sounds);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getSounds();
  }, []);

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
          return <Sound key={el._id} path={el.path} name={el.name} />;
        })
      )}
      <button onClick={handleMute}>
        {mute ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default PlayersContainer;
