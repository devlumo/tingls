import React, { useState, useEffect } from "react";
import { getSounds } from "../../redux/sounds";
import { useDispatch, useSelector } from "react-redux";

import { SoundItem } from "./SoundItem";

const SoundList = () => {
  // const selectGlobalPlay = useSelector((state) => state.sounds.globalPlay);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // trigger redux thunk request
    dispatch(getSounds());
    setLoading(false);
  }, [dispatch]);

  const selectSounds = useSelector((state) => state.sounds.sounds);

  return (
    <div className="flex-col justify-center items-center space-y-3">
      {loading ? (
        <p>Loading</p>
      ) : (
        selectSounds.map((el) => {
          return <SoundItem key={el._id} name={el.name} id={el._id} />;
        })
      )}
    </div>
  );
};

export default SoundList;
