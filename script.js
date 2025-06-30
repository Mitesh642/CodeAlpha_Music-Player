// <------ script.js------>
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlistUI = document.getElementById('playlist');

const songs = [
  { title: "Nee Singam Dhan", artist: "A.R.Rahama.Pathu Thala", src: "songs/song1.mp3" },
  { title: "Antidote", artist: "Karan Aujla", src: "songs/Antidote_1.mp3" },
  { title: "tum se", artist: "Sachin jigar", src: "songs/tum se.mp3" },
  { title: "Aaj Ki Raat", artist: "Sachin jigar", src: "songs/Aaj Ki Raat .mp3"},
  { title: "Admirin_You_", artist: "karan Aujla", src: "songs/Admirin_You_1.mp3" },
  { title: "Supreme", artist: "Shubh", src: "songs/Supreme_1.mp3" },
  { title: "Tension", artist: "Diljit Dosanjh", src: "songs/Tension.mp3" },
  { title: "Wavy", artist: "karan Aujla", src: "songs/Wavy_1.mp3" },
  { title: "Winning_Speech", artist: "Karan Aujla", src: "songs/Winning_Speech_1.mp3" },
  { title: "Right Round", artist: "Flo Rida,kesha", src: "songs/Right Round.mp3" },
  ];

let songIndex = 0;
let isPlaying = false;

// <------Load Song---->
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  highlightCurrent();
}

// <-------Play----->
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = '⏸️';
}

// <------Pause---->
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = '▶️';
}

// <-----Toggle Play------>
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

//<------Next Song---->
nextBtn.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// <-----Previous Song----->
prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// <-----Update Progress----->
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;

  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

// <-----Seek----->
progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// <-----Volume----->
volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// <-----Format Time----->
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// <------Playlist------>
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener('click', () => {
    songIndex = index;
    loadSong(songs[songIndex]);
    playSong();
  });
  playlistUI.appendChild(li);
});

function highlightCurrent() {
  document.querySelectorAll('#playlist li').forEach((li, i) => {
    li.classList.toggle('active', i === songIndex);
  });
}

// <-----Autoplay----->
audio.addEventListener('ended', () => {
  nextBtn.click();
});

// <-----Load first song------>
loadSong(songs[songIndex]);
volume.value = 0.2;
audio.volume = 0.2;
