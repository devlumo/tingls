const removeHowl = (path) => {
  let howls = window.Howler._howls;
  const howlToRemove = howls.find((howl) => howl._src === path);
  howlToRemove.pause();

  // update the global object to only hold the howls we need
  window.Howler._howls = howls.filter((howl) => howl !== howlToRemove);
};

export { removeHowl };
