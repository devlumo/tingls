const updateLocalStorage = (property, value, id) => {
  /*
        Update sound data which is stored in localstorage

        property: property on localStorage object to be updated
        value: new value to be used in object
        id: id of the object in the local storage array
    */
  if (localStorage.getItem("sound-state")) {
    const state = JSON.parse(localStorage.getItem("sound-state"));
    const getCurrentObject = state.find((obj) => obj.id === id);

    if (getCurrentObject) {
      const index = state.indexOf(getCurrentObject);
      state[index][property] = value;
      localStorage.setItem("sound-state", JSON.stringify(state));
    } else {
      state.push({ id: id, [property]: value });
      localStorage.setItem("sound-state", JSON.stringify(state));
    }
  } else {
    localStorage.setItem(
      "sound-state",
      JSON.stringify([{ id: id, [property]: value }])
    );
  }
};

export default updateLocalStorage;
