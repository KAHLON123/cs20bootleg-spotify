// HTML ELEMENTS
let output = document.getElementById('output');
let playBtn = document.getElementById('play-btn');
let pauseBtn = document.getElementById('pause-btn');
let menuEl = document.getElementById('song-menu');

// SONG ELEMENTS
let toccata = new Audio('audio/amyTurk.mp3');
let bolero = new Audio('audio/mauriceRavelBolero.mp3');

// ARRAY
let songs = [{ artist: 'Bach', piece: 'Toccata', audioEl: toccata },
{ artist: 'Ravel', piece: 'Bolero', audioEl: bolero }];
//  { artist: 'Ravel' piece: 'Bolero' id: 'bolero' }];

// make a display for each array index individually and play a certain song (event listener on button)
playBtn.addEventListener('click', playHandler);
pauseBtn.addEventListener('click', pauseHandler);

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
    }
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

function play(audioEl) {
    audioEl.play();
}

function pause(audioEl) {
    audioEl.pause();
}