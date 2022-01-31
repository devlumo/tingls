const removeHowl = (path) => {
  let howls = window.Howler._howls;
  const howlToRemove = howls.find((howl) => howl._src === path);
  howlToRemove.pause();

  // update the global object to only hold the howls we need
  window.Howler._howls = howls.filter((howl) => howl !== howlToRemove);
};

const pauseAllHowls = () => {
  let howls = window.Howler._howls;

  for (let i = 0; i < howls.length; i++) {
    howls[i].pause();
  }
};

const playAllHowls = () => {
  let howls = window.Howler._howls;

  for (let i = 0; i < howls.length; i++) {
    howls[i].play();
  }
};

export { removeHowl, pauseAllHowls, playAllHowls };
