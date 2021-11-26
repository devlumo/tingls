import { useEffect, useState } from "react";
import { Sound } from "./Sound";

import axios from "axios";

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
