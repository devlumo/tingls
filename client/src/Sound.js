import React from "react";
import { useState } from "react";
import ReactHowler from "react-howler";

export const Sound = ({ name, path }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <ReactHowler
        src={[path]}
        playing={playing}
        onLoadError={(e, l) => console.log(e, l, path)}
      />
      <button onClick={() => setPlaying(true)}>{name}</button>
    </div>
  );
};
