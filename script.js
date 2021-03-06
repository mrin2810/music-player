const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
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
        progress.style.width = `${progressPercent}%`;
        const durMins = Math.floor(duration / 60);
        let durSec = Math.floor(duration % 60);
        if(durSec < 10){
            durSec = `0${durSec}`;
        }
        if(durSec){
            durationElem.textContent = `${durMins}:${durSec}`;
        }
        const curMins = Math.floor(currentTime / 60);
        let curSec = Math.floor(currentTime % 60);
        if(curSec < 10){
            curSec = `0${curSec}`;
        }
        if(curSec){
            currTime.textContent = `${curMins}:${curSec}`;
        }
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const currWidth = e.offsetX;
    progress.style.width = `${currWidth / width * 100}%`;
    const { duration } = music;
    music.currentTime = (currWidth / width * duration);
    playSong();
}


playBtn.addEventListener('click', () => {(isPlaying ? pauseSong() : playSong())});
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);

// Update DOM 

function loadSong(song) {
    title.textContent = song.displayName;
    image.setAttribute('src', `img/${song.name}.jpg`);
    music.setAttribute('src', `music/${song.name}.mp3`);
}

loadSong(songs[0]);
