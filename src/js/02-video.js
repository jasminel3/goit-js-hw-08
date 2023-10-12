import vimeo from "@vimeo/player";
import throttle from "lodash.throttle";

function handleTimeUpdate(data) {
  const currentTime = data.seconds;
  localStorage.setItem("videoplayer-current-time", currentTime);
}

function loadSavedTime(vimeo) {
  const savedTime = localStorage.getItem("videoplayer-current-time");
  if (savedTime) {
    vimeo.setCurrentTime(parseFloat(savedTime));
  }
}

function initializePlayer() {
  const iframe = document.querySelector("iframe");
  const player = new Vimeo.Player(iframe);

  loadSavedTime(player);

  const throttledTime = throttle(handleTimeUpdate, 1000);

  player.on("timeupdate", throttledTime);
}
initializePlayer();
