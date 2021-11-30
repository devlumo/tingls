import axios from "axios";
import { useEffect, useState } from "react";
import { Sound } from "./Sound";
// import { Howler } from "howler";

/* 
  TODO:
  - Fix audio context issue - https://stackoverflow.com/questions/46690346/react-and-howlerjs-howler-ctx-is-null
*/
// Howler.mute(false);
// Howler.volume(1);

function App() {
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
}

export default App;
