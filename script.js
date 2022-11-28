// HTML ELEMENTS
let output = document.getElementById('output');
let playBtn = document.getElementById('play-btn');
let pauseBtn = document.getElementById('pause-btn');
let playlistBtn = document.getElementById('playlist-btn');
let menuEl = document.getElementById('song-menu');
let outputEl = document.getElementById('playlist-output');

// SONG ELEMENTS
let toccata = new Audio('audio/amyTurk.mp3');
let bolero = new Audio('audio/mauriceRavelBolero.mp3');

// ARRAYS
let songs = [{ artist: 'Bach', piece: 'Toccata', audioEl: toccata },
{ artist: 'Ravel', piece: 'Bolero', audioEl: bolero }];

let playlist = loadPlaylist();

// make a display for each array index individually and play a certain song (event listener on button)
playBtn.addEventListener('click', playHandler);
pauseBtn.addEventListener('click', pauseHandler);
playlistBtn.addEventListener('click', addToPlaylist);


//EVENT FUNCTIONS
function playHandler() {
    console.log('play');
    let selection = menuEl.value;
    if (selection === 'Toccata') {
        play(toccata);
    } else if (selection === 'Bolero') {
        play(bolero);
    } else if (selection === 'Shuffle') {
        play(songs[returnIn(0, songs.length)].audioEl);
        console.log(returnIn(0, songs.length));
    }    //  else if (selection === 'Navarra') {
    //     play
    // }
}

function pauseHandler() {
    console.log('pause');
    let selection = menuEl.value;
    if (selection === 'Toccata') {
        pause(toccata);
    } else if (selection === 'Bolero') {
        pause(bolero);
    } else if (selection === 'Shuffle') {
        pause(songs[returnIn(0, songs.length)].audioEl);
    }
}

function addToPlaylist() {
    if (menuEl.value === 'Shuffle') {
        alert('Please choose a piece');
    } else {
        var indexFound = indexOf(menuEl.value, songs);
        if (indexFound === -1) {
            playlist.push(songs[indexFound]);
            localStorage.setItem("playlist", JSON.stringify(playlist));
            console.log(playlist);
        } else {
            alert('That piece is already in that playlist');
        }
    }


}

function removeSong() {

}

// HELPER FUNCTIONS

function indexOf(item, array) {
    for (i = 0; i < array.length; i++) {
        if (item === array[i].piece) {
            return i;
            // piece exists in playlist
        }
    }
    return -1;
}

function displayPlaylist() {
    outputEl.innerHTML = '';
    let outputStr = '';
    for (let i = 0; i < playlist.length; i++) {
        outputStr += getPlaylistHTMLStr(playlist[i], i);
    }
    outputEl.innerHTML = outputStr;
}

function getPlaylistHTMLStr(song, indexNum) {
    return `
    <div>
    ${indexNum}:
    ARTIST: ${song.artist}<br>
    TITLE: ${song.piece}
    `;
}

function play(audioEl) {
    audioEl.play();
}

function pause(audioEl) {
    audioEl.pause();
}

function loadPlaylist() {
    let listStr = localStorage.getItem("playlist");
    return JSON.parse(listStr) ?? [];
}