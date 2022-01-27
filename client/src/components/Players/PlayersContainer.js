import React, { useState, useEffect } from "react";
import Sound from "./Sound";
import { getSounds, updateGlobalPlay } from "../../redux/sounds";
import { useDispatch, useSelector } from "react-redux";

import { updateLocalStorage } from "../../utils/updateLocalStorage";

const PlayersContainer = () => {
  // const selectGlobalPlay = useSelector((state) => state.sounds.globalPlay);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    // trigger redux thunk request
    dispatch(getSounds());
    setLoading(false);
  }, [dispatch]);

  const selectSounds = useSelector((state) => state.sounds.sounds);
  console.log(selectSounds, "playercontainer");

  const handleMute = () => {
    setMute(!mute);
    console.log("mute");
    window.Howler.mute(!mute);
  };

  // const handleStop = () => {
  //   // check if there is any sound playing, if not, lets start
  //   let soundstate = JSON.parse(localStorage.getItem("sound-state"));
  //   let anySoundsPlaying = soundstate.find(
  //     (sound) => sound.volume > 0 && sound.playing === true
  //   );

  //   if (!anySoundsPlaying) {
  //     updateLocalStorage("playing", !stopped);
  //     setStop(!stopped);
  //     window.Howler.stop(!stopped);
  //     dispatch(updateGlobalPlay(stopped));
  //     return;
  //   }

  //   // undo the above
  //   updateLocalStorage("playing", !stopped);
  //   setStop(!stopped);
  //   window.Howler.stop(!stopped);
  //   dispatch(updateGlobalPlay(stopped));
  // };

  return (
    <div className="flex justify-center items-center space-x-4">
      {loading ? (
        <p>Loading</p>
      ) : (
        selectSounds.map((el) => {
          return (
            <Sound key={el._id} id={el._id} name={el.name} path={el.path} />
          );
        })
      )}
      <button onClick={handleMute}>{mute ? "unmute" : "mute"}</button>
    </div>
  );
};

export default PlayersContainer;
