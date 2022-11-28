// rando library

// return random decimal b/t inclusive low + exclusive high
function randomDec(low, high) {
    return Math.random() * (high - low) + low;
}

// return random integer b/t inclusive low + exclusive high
function returnIn(low, high) {
    return Math.floor(randomDec(low, high));
}

// return random rgb colour
function randomRGB() {
    return `rgb(${randomInt(0, 256)}, ${randomInt(0, 256)}, ${randomInt(0, 256)})`;
}

