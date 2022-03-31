import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addHubSound, removeHubSound } from "../../redux/hub";
import { getSounds } from "../../redux/sounds";
import { playAllHowls } from "../../utils/howlerUtils";
import { like } from "../../api/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion/dist/framer-motion";

import "./SoundItemStyles.scss";

export const SoundItem = ({ id, name, path, imageUrl, likeCount, likedBy }) => {
  const dispatch = useDispatch();

  const { userID } = useSelector((state) => state.user);

  let liked = Boolean(likedBy.find((id) => userID === id));
  const [likedByUser, setLikedByUser] = useState(liked);

  const hubPlaying = useSelector((state) => state.soundHub.hubPlay);

  const added = Boolean(
    useSelector((state) =>
      state.soundHub.currentSounds.find((sound) => sound.id === id)
    )
  );

  // add the sound object to the Hub
  const addToHub = () => {
    const soundObject = {
      id,
      path,
      name,
      volume: 0,
    };

    dispatch(addHubSound(soundObject));

    // only auto play the added sound if the hub is playing others
    if (hubPlaying) {
      playAllHowls();
    }
  };

  // remove sounds from the Hub
  const removeFromHub = () => {
    dispatch(removeHubSound({ id, path }));
  };

  const handleLike = async () => {
    let val = 1;

    if (!userID) {
      toast.warn("Login to like!");
      return;
    }
    if (likedByUser) {
      val = -1;
    }

    // recall getSounds at the end will only update the changes
    await like(id, val);
    setLikedByUser(!liked);
    dispatch(getSounds());
  };

  return (
    <motion.div whileHover={{ y: -2 }} className="sound-item">
      <div className="card-content">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="card-footer">
        <div className="info">
          <div className="name">{name}</div>
          {!added ? (
            <button onClick={addToHub} className="add">
              ADD
            </button>
          ) : (
            <button onClick={removeFromHub} className="remove">
              REMOVE
            </button>
          )}
        </div>
        <div className="sub">
          <div
            className={likedByUser ? "like-button liked" : "like-button like"}
            onClick={handleLike}
          >
            <FaHeart />
          </div>
          <div className="like-count">{likeCount}</div>
        </div>
      </div>
    </motion.div>
  );
};
