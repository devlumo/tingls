/* 
    howlerUtils
    - contains functions that interact directly with the Howler object
    - Howler Object needs to be initialised for these functions to run
*/

const removeHowl = (path) => {
  let howls = window.Howler._howls;
  const howlToRemove = howls.find((howl) => howl._src === path);

  // update the global object to only hold the howls we need
  window.Howler._howls = howls.filter((howl) => howl !== howlToRemove);
};

const pauseAllHowls = () => {
  if (window.Howler) {
    let howls = window.Howler._howls;
    for (let i = 0; i < howls.length; i++) {
      howls[i].pause();
    }
  }
};

const playAllHowls = () => {
  let howls = window.Howler._howls;
  const storedState = JSON.parse(localStorage.getItem("app_state"));

  for (let i = 0; i < howls.length; i++) {
    // if the sound is paused (default) then play

    let currentSound = storedState.hubSounds.find(
      (sound) => sound.path === howls[i]._src
    );

    // set mute - mute does not work in useSound hook options
    if (currentSound.muted) {
      howls[i].mute(true);
    } else {
      howls[i].mute(false);
    }

    if (howls[i]._sounds[0]._paused) {
      // ** ADDITIONAL HOWL OPTIONS CAN BE SET HERE - https://github.com/goldfire/howler.js#options **

      // loop must be set to true via the sounds array in each howl
      howls[i]._sounds[0]._loop = true;
      howls[i]._loop = true;

      // all settings need to be made before the sound is played, so .play() must be last
      howls[i].play();
    }
  }
};

// check if the new data contains any of the current howls, if it doesn't contain them then remove them from Howler
const removePreviousHowls = (data) => {
  if (window.Howler) {
    let howls = window.Howler._howls;

    const getHowls = howls.filter(
      (howl) => !data.find((data) => howl._src === data.path)
    );
    const howlsToRemove = getHowls.map((howl) => howl._src);

    // run the remove howl function on each howl
    howlsToRemove.forEach((item) => removeHowl(item));
  }
};

const pauseHowl = (path) => {
  let howls = window.Howler._howls;
  const howlToPause = howls.find((howl) => howl._src === path);
  const howlToPauseIndex = howls.indexOf(howlToPause);
  howls[howlToPauseIndex].pause();
};

const getHowlCount = () => {
  if (window.Howler) {
    let howls = window.Howler._howls;
    return howls.length;
  } else {
    return 0;
  }
};

const removeAllHowls = () => {
  if (window.Howler) {
    window.Howler._howls = [];
  }
};

export {
  removeHowl,
  pauseAllHowls,
  playAllHowls,
  removePreviousHowls,
  pauseHowl,
  getHowlCount,
  removeAllHowls,
};
