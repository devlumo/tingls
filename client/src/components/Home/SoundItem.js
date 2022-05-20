import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addHubSound, removeHubSound } from "../../redux/hub";
import { getSounds } from "../../redux/sounds";
import { playAllHowls } from "../../utils/howlerUtils";
import { like } from "../../api/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaHeart, FaArrowRight, FaStar, FaArrowLeft } from "react-icons/fa";

import "./SoundItemStyles.scss";

export const SoundItem = ({ id, name, path, imageUrl, likeCount, likedBy }) => {
  const dispatch = useDispatch();

  const { userID } = useSelector((state) => state.user);

  let liked = Boolean(likedBy.find((id) => userID === id));
  const [likedByUser, setLikedByUser] = useState(liked);

  const hubPlaying = useSelector((state) => state.soundHub.hubPlay);

  const [show, handleShow] = useState("hide");

  const handleMouseOver = () => {
    handleShow(null);
  };

  const handleMouseOut = () => {
    handleShow("hide");
  };

  const added = Boolean(
    useSelector((state) =>
      state.soundHub.currentSounds.find((sound) => sound.id === id)
    )
  );

  // add the sound object to the Hub
  const addToHub = () => {
    if (!added) {
      const soundObject = {
        id,
        path,
        name,
        volume: 0,
        imageUrl,
      };

      dispatch(addHubSound(soundObject));

      // only auto play the added sound if the hub is playing others
      if (hubPlaying) {
        playAllHowls();
      }
    } else {
      dispatch(removeHubSound({ id, path }));
    }
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
    <div className="item-wrap">
      <div
        className="sound-item"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className={`like-count ${show}`}>{likeCount} LIKES</div>
        <div className="content">
          <div className="icon">
            <img src={imageUrl} alt="icon" />
          </div>
          <div className="sound-name">{name}</div>
        </div>
        <div className="footer">
          <div
            className={likedByUser ? `option ${show} liked` : `option ${show}`}
            onClick={handleLike}
          >
            <FaHeart />
          </div>
          <div className={`option ${show}`}>
            <FaStar />
          </div>
          <div className={`option ${show}`} onClick={addToHub}>
            {added ? <FaArrowLeft /> : <FaArrowRight />}
          </div>
        </div>
      </div>
    </div>
  );
};
