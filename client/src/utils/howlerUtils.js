/* 
    howlerUtils
    - contains functions that interact directly with the Howler object 
*/

const removeHowl = (path) => {
  let howls = window.Howler._howls;
  console.log("remove", path);
  const howlToRemove = howls.find((howl) => howl._src === path);
  console.log("remove ", howlToRemove);
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

  for (let i = 0; i < howls.length; i++) {
    // if the sound is paused (default) then play
    if (howls[i]._sounds[0]._paused) {
      howls[i].play();

      // loop must be set to true via the sounds array in each howl
      howls[i]._sounds[0]._loop = true;
    }
  }
};

// check if the new data contains any of the current howls, if it doesn't contain them then remove them from Howler
const removePreviousHowls = (data) => {
  if (window.Howler) {
    let howls = window.Howler._howls;
    let howlsToRemove = [];

    for (let i = 0; i < howls.length; i++) {
      let match = false;
      for (let j = 0; j < data.length; j++) {
        if (howls[i]._src === data[j].path) {
          match = true;
          break;
        }
      }
      if (!match) {
        howlsToRemove.push(howls[i]._src);
      }
    }

    howlsToRemove.forEach((item) => removeHowl(item));
  }
};

export { removeHowl, pauseAllHowls, playAllHowls, removePreviousHowls };
