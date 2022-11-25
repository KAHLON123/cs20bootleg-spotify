// HTML ELEMENTS
let output = document.getElementById('output');

let toccata = document.getElementById('toccata-in-d');
// let bolero = document.getElementById('ravel-bolero');

let playBtn = document.getElementById('play-btn');
let pauseBtn = document.getElementById('pause-btn');


let songs = [{ artist: 'Bach', piece: 'Toccata', id: 'toccata' }];
//  { artist: 'Ravel' piece: 'Bolero' id: 'bolero' }];

// make a display for each array index individually and play a certain song (event listener on button)
playBtn.addEventListener('click', playHandler);
pauseBtn.addEventListener('click', pauseHandler);

function playHandler() {
    console.log('play');
    let selection = menuEl.value;
    if (selection === 'Toccata in d minor, Amy Turk') {
        play(songs[0].id);
    }
}

function pauseHandler() {
    console.log('pause');
    let selection = menuEl.value;
    if (selection === 'Toccata in d minor, Amy Turk') {
        pause(songs[0].id);
    }
}

function play(songName) {
    songName.play();
}

function pause(songName) {
    songName.pause();
}