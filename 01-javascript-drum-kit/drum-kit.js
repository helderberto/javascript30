function removeTransition(event) {
  if (event.propertyName !== "transform") {
    return;
  }

  event.target.classList.remove("playing");
}

const keysEl = Array.from(document.querySelectorAll(".key"));
keysEl.forEach(key => key.addEventListener("transitionend", removeTransition));

function findKeyElement(keyCode) {
  return document.querySelector(`div[data-key="${keyCode}"]`);
}

function findAudioElement(keyCode) {
  return document.querySelector(`audio[data-key="${keyCode}"]`);
}

function isValidAudioElement(audioEl, event) {
  if (!audioEl) {
    throw `Invalid code: ${event.code} | keyCode: ${event.keyCode}`;
  }
  return true;
}

function playSound(event) {
  const { keyCode } = event;

  const audioEl = findAudioElement(keyCode);
  const keyEl = findKeyElement(keyCode);

  isValidAudioElement(audioEl, event);

  keyEl.classList.add("playing");
  audioEl.currentTime = 0;
  audioEl.play();
}

window.addEventListener("keydown", playSound);
