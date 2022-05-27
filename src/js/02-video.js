import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const player = new Player('vimeo-player');

const throttledTimeUpdate = throttle(timeUpdate, 1000);

function timeUpdate({ seconds }) {
  localStorage.setItem(STORAGE_KEY, seconds);
}

player.on('timeupdate', throttledTimeUpdate);

function continuePLay() {
  const seconds = localStorage.getItem(STORAGE_KEY);
  player.setCurrentTime(seconds);
  player.play();
}

window.addEventListener('load', continuePLay);
