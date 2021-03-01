const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progress = document.getElementById('progress');
const durationElem = document.getElementById('duration');
const currTime = document.getElementById('current-time');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

let songNum = 0;
const songs = [
    {
        name: 'Dil-Se-Re',
        displayName: 'Dil Se Re',
        artist: 'A. R. Rehman',
    },
    {
        name: 'Jiya-Jale-Jaan-Jale',
        displayName: 'Jiya Jale Jaan Jale',
        artist: 'A. R. Rehman',
    },
    {
        name: 'Kuch-Sher-Sunata-Hoon',
        displayName: 'Kuch Sher Sunata Hoon',
        artist: 'A. R. Rehman',
    },
    {
        name: 'Phir-Se-Ud-Chala',
        displayName: 'Phir Se Ud Chala',
        artist: 'A. R. Rehman',
    },
];

let isPlaying = false;
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

function prevSong() {
    if(songNum === 0) {
        songNum = 3;
    } 
    else {
        songNum = (songNum - 1) % songs.length;
    }
    loadSong(songs[songNum]);
    playSong();
}

function nextSong() {
    songNum = (songNum + 1) % songs.length;
    loadSong(songs[songNum])
    playSong();
}

// Update Progress bar and Time

function updateProgressBar(e) {
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;
        const progressPercent = currentTime / duration * 100;
        console.log(progressPercent);
        progress.style.width = `${progressPercent}%`;
    }
}


playBtn.addEventListener('click', () => {(isPlaying ? pauseSong() : playSong())});
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
music.addEventListener('timeupdate', updateProgressBar);

// Update DOM 

function loadSong(song) {
    title.textContent = song.displayName;
    image.setAttribute('src', `img/${song.name}.jpg`);
    music.setAttribute('src', `music/${song.name}.mp3`);
}

loadSong(songs[0]);
