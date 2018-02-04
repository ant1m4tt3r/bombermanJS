const HORIZONTAL_BLOCKS = 17;
const VERTICAL_BLOCKS = 13;

const BLOCK_SIZE = 42;

const GAME_WIDTH = HORIZONTAL_BLOCKS * BLOCK_SIZE;
const GAME_HEIGHT = VERTICAL_BLOCKS * BLOCK_SIZE;

const fr = 10;

let game;

function setup() {
    createCanvas(GAME_WIDTH, GAME_HEIGHT);
    game = new Game(BLOCK_SIZE);
    frameRate(fr);
}

function draw() {
    game.draw();
    if (!game.finish) {
        commands();
    }
}

function allowFullSreen() {
    var fs = fullscreen();
    fullscreen(!fs);
}

function commands(touch) {
    if (game) {
        if (keyIsDown(32) || touch == 'bomb') {
            game.putBomb();
        }
        if (keyIsDown(LEFT_ARROW) || touch == 'left') {
            game.moveBomberman(getDirection(LEFT_ARROW));
            return;
        }
        if (keyIsDown(RIGHT_ARROW) || touch == 'right') {
            game.moveBomberman(getDirection(RIGHT_ARROW));
            return;
        }
        if (keyIsDown(UP_ARROW) || touch == 'up') {
            game.moveBomberman(getDirection(UP_ARROW));
            return;
        }
        if (keyIsDown(DOWN_ARROW) || touch == 'down') {
            game.moveBomberman(getDirection(DOWN_ARROW));
            return;
        }
    }
}

function getDirection(key) {
    switch (key) {
        case LEFT_ARROW:
            return { x: -1, y: 0, img: 'left' };
            break;
        case RIGHT_ARROW:
            return { x: +1, y: 0, img: 'right' };
            break;
        case UP_ARROW:
            return { x: 0, y: -1 };
            break;
        case DOWN_ARROW:
            return { x: 0, y: +1 };
            break;
    }
}

function facebookShare() {
    FB.ui({
        method: 'share',
        href: 'https://hugoazevedosoares.github.io/bombermanJS/',
    }, function(response) {});
}