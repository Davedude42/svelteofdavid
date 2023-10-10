// Global constants and variables

const WALLS = [110, 106, 109, 107];
let WALLS_SUM = [];

let s = 0;
for(let i = 0; i < WALLS.length; i++) {
    s += WALLS[i];
    WALLS_SUM.push(s);
}

const GOOD_COLORS = {
    "red": [4, 95, 50, 100],
    "orange": [25, 100, 50, 100],
    "yellow": [46, 100, 50, 100],
    "green": [120, 95, 40, 100],
    "teal": [160, 100, 50, 100],
    "blue": [230, 100, 25, 100],
    "purple": [285, 100, 37, 100],
    "off-white": [20, 100, 65, 100],
    "offer-white": [20, 100, 55, 100]
};

// Functions

function layer(base, top) {
    if(top[3] > 100) {
        console.log('layer() has an issue with that');
    }
    return base.map((val, i) => Math.floor(val + (top[i] - val) * (top[3] / 100)));
}

function gradient(pattern, percent) {
    let i = 0;
    while(true) {
        if(i + 2 >= pattern.length) {
            return pattern[i];
        } else if(percent < pattern[i + 3]) {
            let p = (percent - pattern[i + 1]) / (pattern[i + 3] - pattern[i + 1]);
            return pattern[i].map((val, j) => val + Math.floor((pattern[i + 2][j] - val) * p));
        }
        i += 2;
    }
}

function hsl_to_rgb(hsl) {
    // Convert HSL to RGB (simplified, as JavaScript doesn't have a direct library like colorsys)
    // ... this function would need a proper implementation

    return color;
}

function rgb_to_hsl(rgb) {
    // Convert RGB to HSL (simplified, as JavaScript doesn't have a direct library like colorsys)
    // ... this function would need a proper implementation

    return color;
}

function wall(pixels, walln, color) {
    let start = WALLS.slice(0, walln % 4).reduce((a, b) => a + b, 0);
    for(let i = start; i < start + WALLS[walln % 4]; i++) {
        pixels[i] = color;
    }
}

function loop(index, length) {
    while(index < 0) {
        index += length;
    }
    while(index >= length) {
        index -= length;
    }
    return index;
}

function looping(start, end, length) {
    console.log(start > end);
    let ret = [start];
    let i = start;
    while(i !== end) {
        i += end > start ? 1 : -1;
        ret.push(i);
    }
    return ret;
}

function loopedList(length, start, end) {
    // This function is incomplete in the original Python code
    let ret = [];
    // ...
    return ret;
}

