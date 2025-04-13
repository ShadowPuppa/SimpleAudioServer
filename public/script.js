let songs = [];
let currentSongIndex = 0;
let isPlaying = false;
let isShuffling = false;

const audioPlayer = document.getElementById('audioPlayer');
const library = document.getElementById('library');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const currentSongTitle = document.getElementById('currentSongTitle');
const searchInput = document.getElementById('searchInput');

async function fetchSongs() {
  try {
    const response = await fetch('/songs');
    songs = await response.json();
    displaySongs(songs);
  } catch (err) {
    library.innerHTML = 'Failed to load songs';
    console.error('Error fetching songs:', err);
  }
}

function displaySongs(songList) {
  library.innerHTML = '';
  songList.forEach((song, index) => {
    const songDiv = document.createElement('div');
    songDiv.classList.add('song');
    songDiv.textContent = `${song.title} - ${song.artist}`;
    songDiv.addEventListener('click', () => {
      playSong(index);
    });
    library.appendChild(songDiv);
  });
}

function playSong(index) {
  currentSongIndex = index;
  const song = songs[index];
  audioPlayer.src = `/music-lib/${encodeURIComponent(song.file)}`;
  audioPlayer.play();
  isPlaying = true;
  updatePlayPauseIcon();
  currentSongTitle.textContent = `${song.title} - ${song.artist}`;
}

function togglePlayPause() {
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
  isPlaying = !isPlaying;
  updatePlayPauseIcon();
}

function playNextSong() {
  if (isShuffling) {
    currentSongIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
  }
  playSong(currentSongIndex);
}

function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
}

function toggleShuffle() {
  isShuffling = !isShuffling;
  shuffleBtn.classList.toggle('active', isShuffling);
}

function updatePlayPauseIcon() {
  playPauseBtn.innerHTML = isPlaying
    ? '<i class="fas fa-pause"></i>'
    : '<i class="fas fa-play"></i>';
}

function searchSongs() {
  const query = searchInput.value.toLowerCase();
  const filtered = songs.filter(song =>
    `${song.title} ${song.artist}`.toLowerCase().includes(query)
  );
  displaySongs(filtered);
}

audioPlayer.addEventListener('ended', playNextSong);
playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', playPreviousSong);
shuffleBtn.addEventListener('click', toggleShuffle);
searchInput.addEventListener('input', searchSongs);

fetchSongs();
