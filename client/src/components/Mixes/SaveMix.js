import React from "react";
import axios from "axios";

import "./SaveMixStyles.scss";

const SaveMix = () => {
  const handleSave = async () => {
    try {
      const app_state = JSON.parse(localStorage.getItem("app_state"));
      const data = JSON.stringify(app_state.hubSounds);

      if (!app_state.hubSounds.length) {
        throw new Error("There are no sounds added!");
      }

      // TODO: MODAL
      const name = "Test1";

      const res = await axios.post(
        "http://127.0.0.1:8080/api/sounds/createMix",
        {
          name,
          data,
        },
        { withCredentials: true }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleSave} className="save">
        Save Tingl
      </button>
    </>
  );
};

export default SaveMix;
