const HORIZONTAL_BLOCKS = 17;
const VERTICAL_BLOCKS = 13;

const BLOCK_SIZE = 40;

const GAME_WIDTH = HORIZONTAL_BLOCKS * BLOCK_SIZE;
const GAME_HEIGHT = VERTICAL_BLOCKS * BLOCK_SIZE;

const fr = 8;

let game;

function setup() {
    createCanvas(GAME_WIDTH, GAME_HEIGHT);
    game = new Game();
    frameRate(fr);
}

function draw() {
    game.draw();
    commands();
}

function commands() {
    if (game) {
        if (keyIsDown(LEFT_ARROW))
            game.moveBomberman(getDirection(LEFT_ARROW));
        if (keyIsDown(RIGHT_ARROW))
            game.moveBomberman(getDirection(RIGHT_ARROW));
        if (keyIsDown(UP_ARROW))
            game.moveBomberman(getDirection(UP_ARROW));
        if (keyIsDown(DOWN_ARROW))
            game.moveBomberman(getDirection(DOWN_ARROW));
        if (keyIsDown(32))
            game.putBomb();
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