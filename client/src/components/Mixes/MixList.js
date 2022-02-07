import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMixes } from "../../redux/mixes";
import MixItem from "./MixItem";
import "./MixListStyles.scss";

const MixList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // trigger redux thunk request
    dispatch(getMixes());
    setLoading(false);
  }, [dispatch]);

  const selectMixes = useSelector((state) => state.mixes.mixes);
  return (
    <div className="mix-wrapper">
      {loading ? (
        <p>Loading</p>
      ) : (
        selectMixes.map((el) => {
          return (
            <MixItem key={el._id} name={el.name} id={el._id} data={el.data} />
          );
        })
      )}
    </div>
  );
};

export default MixList;
