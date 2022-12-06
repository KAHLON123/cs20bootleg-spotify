// HTML ELEMENTS
let slider = document.getElementById('songRange');
let rangeOutputEl = document.getElementById('range-display');

let playBtn = document.getElementById('play-btn');
let pauseBtn = document.getElementById('pause-btn');
let playlistBtn = document.getElementById('playlist-btn');
let removeBtn = document.getElementById('remove-btn');
let restartBtn = document.getElementById('restart-btn');

let menuEl = document.getElementById('song-menu');
let outputEl = document.getElementById('playlist-output');

// SONG ELEMENTS
let toccata = new Audio('audio/amyTurk.mp3');
let bolero = new Audio('audio/mauriceRavelBolero.mp3');
let navarra = new Audio('audio/sarasateNavarra.mp3');
let campanella = new Audio('audio/lisztCampanella.mp3');
let pagCapFive = new Audio('audio/paganiniCaprice5.mp3');
let wienEtCap = new Audio('audio/wieniawskiEtudeCaprice.mp3');

// ARRAYS
let songs = [{ artist: 'Bach', piece: 'Toccata', audioEl: toccata }, { artist: 'Ravel', piece: 'Bolero', audioEl: bolero }, { artist: 'Sarasate', piece: 'Navarra', audioEl: navarra }, { artist: 'Liszt', piece: 'Campanella', audioEl: campanella }, { artist: 'Paganini', piece: 'PaganiniCaprice', audioEl: pagCapFive }, { artist: 'Wieniawski', piece: 'EtudeCaprice', audioEl: wienEtCap }];

let playlist = loadPlaylist();

// event listeners
playBtn.addEventListener('click', playHandler);
pauseBtn.addEventListener('click', pauseHandler);
playlistBtn.addEventListener('click', addToPlaylist);
removeBtn.addEventListener('click', removeSong);
restartBtn.addEventListener('click', reset);

// DISPLAY PLAYLIST:
listDisplay();
function listDisplay() {
    outputEl.innerHTML = '';
    let outputStr = '';
    for (let i = 0; i < playlist.length; i++) {
        outputStr += getPlaylistHTMLStr(playlist[i], i);
    }
    outputEl.innerHTML = outputStr;
}

//EVENT FUNCTIONS
function playHandler() {
    let selection = menuEl.value;
    let sliderDisVal = '';
    if (selection === 'Shuffle') {
        let randNum = returnIn(0, songs.length);
        play(songs[randNum].audioEl);
        console.log(randNum);
        menuEl.value = songs[randNum].piece;
        sliderDisVal = songs[randNum].audioEl.currentTime;
    } else {
        let indexFound = indexOf(selection, songs);
        play(songs[indexFound].audioEl);
        sliderDisVal = songs[indexFound].audioEl.currentTime;

    }
}

function pauseHandler() {
    let selection = menuEl.value;
    pause(songs[indexOf(selection, songs)].audioEl);
}

function addToPlaylist() {
    if (menuEl.value === 'Shuffle') {
        alert('Please choose a piece');
    } else {
        // Check if chosen song if already in playlist
        let indexFound = indexOf(menuEl.value, playlist);
        if (indexFound === -1) {
            // Not in playlist - add to playlist
            let songIndex = indexOf(menuEl.value, songs);
            console.log(songIndex, songs[songIndex]);
            playlist.push(songs[songIndex]);
            listSave();
            listDisplay();
            console.log(playlist);
        } else {
            alert('That piece is already in your liked music');
        }
    }
}

function removeSong() {
    if (menuEl.value === 'Shuffle') {
        alert('Please choose a piece');
    } else {
        let indexFound = indexOf(menuEl.value, playlist);
        if (indexFound === -1) {
            alert('That piece is not in your liked music');
        } else {
            playlist.splice(indexFound, 1);
            listSave();
            listDisplay();
        }
    }
}

function reset() {
    let currentSong = songs[indexOf(menuEl.value, songs)].audioEl;
    console.log(currentSong);
    currentSong.pause;
    currentSong.currentTime = 0;
}

// HELPER FUNCTIONS
function indexOf(item, array) {
    for (i = 0; i < array.length; i++) {
        if (item === array[i].piece) {
            return i;
        }
    }
    return -1;
}

function getPlaylistHTMLStr(song, indexNum) {
    return `
    <div>
    ${indexNum}:
    ARTIST: ${song.artist}<br>
    TITLE: ${song.piece}<br><br>
    `;
}

function play(audioEl) {
    audioEl.play();
    console.log('play');
}

function pause(audioEl) {
    audioEl.pause();
    console.log("pause");
}

function listSave() {
    localStorage.setItem("playlist", JSON.stringify(playlist));
}

function loadPlaylist() {
    let listStr = localStorage.getItem("playlist");
    return JSON.parse(listStr) ?? [];
}