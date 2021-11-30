import React, { useState, useEffect } from "react";
import axios from "axios";
import Sound from "./Sound";

const SoundsContainer = () => {
  const [sounds, setSounds] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="App">
      <h1>Hello Tingls</h1>
      {loading ? (
        <p>Loading</p>
      ) : (
        sounds.map((el) => {
          return <Sound key={el._id} path={el.path} name={el.name} />;
        })
      )}
    </div>
  );
};

export default SoundsContainer;
