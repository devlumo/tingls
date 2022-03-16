import React, { useState, useEffect } from "react";
import { getSounds } from "../../redux/sounds";
import { useDispatch, useSelector } from "react-redux";

import { SoundItem } from "./SoundItem";

import "./SoundList.scss";

const SoundList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // trigger redux thunk request
    dispatch(getSounds());
    setLoading(false);
  }, [dispatch]);

  const selectSounds = useSelector((state) => state.sounds.sounds);

  return (
    <div className="sound-list">
      <div className="sound-header">
        <b>Sounds</b>
      </div>
      <div className="sounds-wrapper">
        {loading ? (
          <p>Loading</p>
        ) : (
          selectSounds.map((el) => {
            return (
              <SoundItem
                key={el._id}
                name={el.name}
                id={el._id}
                path={el.path}
                imageUrl={el.imageUrl}
                likeCount={el.likeCount}
                likedBy={el.likedBy}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default SoundList;
