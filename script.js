const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'jacinto-1', 
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    // console log the (e) and target into audio, so the srcElement.into that we target duration and currenTime 
    // we pull out with destructuring,in order to use these two properties we equal them with the obj we pull them from.
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    // giving a percentage
    const progressPercent = (currentTime / duration) * 100;
    // change the percentage from num to string(you add % at the end for the css)
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    // Remainder (%) returns the remainder left over when one operand is divided by a second operand. It always takes the sign of the dividend.
    let durationSeconds = Math.floor(duration % 60);
    // do this in order to achive the (:0) before the ex.6 on the seconds 
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    // if we have a value, display as strings the following
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  // first cnl the event at the prog bar(srcElement/clientWidth/offsetX)always cnl the const's
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  // in order to find the duration(the currentTime atr sets or returns the current playback position in seconds)
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
// add ended so can do to the next song
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
