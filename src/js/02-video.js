import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const player = new Player('vimeo-player');

const timeToStart = localStorage.getItem(STORAGE_KEY);
if (timeToStart) {
  player.setCurrentTime(timeToStart);
}

const throttledTimeUpdate = throttle(takeValueSeconds, 1000);

function takeValueSeconds(data) {
  localStorage.setItem(STORAGE_KEY, Number.parseInt(data.seconds));
  // player.setMuted(false);
}

player.on('timeupdate', throttledTimeUpdate);

// function continuePLay() {
//   const seconds = localStorage.getItem(STORAGE_KEY);
//   player.setCurrentTime(Number.parseInt(seconds));
//   player.play();
//   player.setMuted(true);
// }

// window.addEventListener('load', continuePLay);
