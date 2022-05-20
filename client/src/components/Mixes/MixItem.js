import React from "react";
import { useDispatch } from "react-redux";
import { loadMix } from "../../redux/hub";
import moment from "moment";
import "./MixItemStyles.scss";
import Avatar from "../Avatars/Avatar";

const MixItem = ({ id, name, data, creator, createdOn }) => {
  const dispatch = useDispatch();

  const handleLoadMix = () => {
    dispatch(loadMix(data));
  };

  const mixData = JSON.parse(data);

  const time = Date.parse(createdOn);
  const dateObj = new Date(time);
  const createdDate = moment(dateObj).fromNow();

  return (
    <div className="mix-item">
      <div className="name">
        <h3>{name}</h3>
      </div>
      <div className="sounds">
        {mixData.map((mix) => (
          <Avatar imagePath={mix.imageUrl} bgColor="#4e00c2" />
        ))}
      </div>
      <div className="footer-wrap">
        <div className="creator">By {creator}</div>
        <div className="footer">
          <div className="date">{createdDate}</div>
          <button onClick={handleLoadMix} className="">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MixItem;
