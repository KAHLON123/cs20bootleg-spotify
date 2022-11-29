// HTML ELEMENTS
let output = document.getElementById('output');

let playBtn = document.getElementById('play-btn');
let pauseBtn = document.getElementById('pause-btn');
let playlistBtn = document.getElementById('playlist-btn');
let removeBtn = document.getElementById('remove-btn');

let menuEl = document.getElementById('song-menu');
let outputEl = document.getElementById('playlist-output');

// SONG ELEMENTS
let toccata = new Audio('audio/amyTurk.mp3');
let bolero = new Audio('audio/mauriceRavelBolero.mp3');

// ARRAYS
let songs = [{ artist: 'Bach', piece: 'Toccata', audioEl: toccata }, { artist: 'Ravel', piece: 'Bolero', audioEl: bolero }];

let playlist = loadPlaylist();

// make a display for each array index individually and play a certain song (event listener on button)
playBtn.addEventListener('click', playHandler);
pauseBtn.addEventListener('click', pauseHandler);
playlistBtn.addEventListener('click', addToPlaylist);
removeBtn.addEventListener('click', removeSong);


// DISPLAY PLAYLIST:
listDisplay();
function listDisplay() {
    outputEl.innerHTML = '';
    let outputStr = '';
    for (let i = 0; i < playlist.length; i++) {
        outputStr += getPlaylistHTMLStr(songs[i], i);
    }
    outputEl.innerHTML = outputStr;

}

//EVENT FUNCTIONS
function playHandler() {
    let selection = menuEl.value;
    if (selection === 'Shuffle') {
        play(songs[returnIn(0, songs.length)].audioEl);
        console.log(returnIn(0, songs.length));
    } else {
        play(songs[indexOf(selection, songs)].audioEl);
    }
}

function pauseHandler() {
    let selection = menuEl.value;
    if (selection === 'Toccata') {
        pause(toccata);
    } else if (selection === 'Bolero') {
        pause(bolero);
    } else if (selection === 'Shuffle') {
        let randNum = returnIn(0, songs.length);
        menuEl.value = songs[randNum].piece;
        pause(songs[randNum].audioEl);
    }
}

function addToPlaylist() {
    if (menuEl.value === 'Shuffle') {
        alert('Please choose a piece');
    } else {
        var indexFound = indexOf(menuEl.value, playlist);
        console.log(indexFound);
        if (indexFound === -1) {
            playlist.push(songs[indexFound]);
            listSave();
            listDisplay();
            console.log(playlist);
        } else {
            alert('That piece is already in that playlist');
        }
    }
}

function removeSong() {
    if (menuEl.value === 'Shuffle') {
        alert('Please choose a piece');
    } else {
        playlist.splice(indexOf(menuEl.value, playlist), 1);
        listSave();
        listDisplay();
    }
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
    ${indexNum}:<br>
    ARTIST: ${song.artist}<br>
    TITLE: ${song.piece}
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