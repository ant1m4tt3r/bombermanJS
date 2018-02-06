class Game {

    constructor(blockSize) {
        this.gameState = 'running';
        this.finish = false;
        this.img = loadImage('assets/background.bmp');
        this.grid = { width: 17, height: 13 }
        this.size = blockSize;
        this.bomberman = new Bomberman(this);
        this.exploding = false;
        this.notAllowed = [1, 2, 3];
        this.bombs = [];
        this.numBombs = 0;
        this.maxBombs = 10;
        this.numEnemys = 3;
        this.maxEnemys = 3;
        this.enemys = [];
        this.states = {
            win: 'win',
            dead: 'dead',
            nextPhase: 'next',
            playing: 'playing'
        };
        this.state = '';
        this.imgs = {
            block: loadImage('assets/block.png'),
            bomb: loadImage('assets/bomb.png'),
            exp_center: loadImage('assets/exp_center.png'),
            exp_horizontal: loadImage('assets/exp_horizontal.png'),
            exp_vertical: loadImage('assets/exp_vertical.png'),
            game_over: loadImage('assets/game_over.bmp'),
            win: loadImage('assets/win.bmp')
        };
        /**
         * 1 = parede
         * 2 = bloco
         * 3 = bomba
         * 4 = explosão
         */
        this.maze = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 0, 1, 2, 1],
            [1, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.createEnemys();
        this.setScoreElements();
    }

    isEmptySpace(x, y) {
        return this.maze[y][x] == 0
    }

    isUsableSpace(x, y) {
        try {
            return !this.notAllowed.includes(this.maze[y][x]);
        } catch (err) {
            return false;
        }
    }

    setScoreElements() {
        this.bombsLeftElement = select('#bombs-left');
        this.enemysKilledElement = select('#killed-enemys');
    }

    createEnemys() {
        this.enemys.push(new Enemy(this, { x: 5, y: 9 }));
        this.enemys.push(new Enemy(this, { x: 11, y: 11 }));
        this.enemys.push(new Enemy(this, { x: 6, y: 3 }));
    }

    moveBomberman(direction) {
        if (this.isUsableSpace(this.bomberman.pos.x + direction.x, this.bomberman.pos.y + direction.y)) {
            this.bomberman.pos.x += direction.x;
            this.bomberman.pos.y += direction.y;
            this.bomberman.update(direction.img);
        }
    }

    explosion(bomb) {
        this.maze[bomb.y][bomb.x] = 4;
        this.exploding = true;
        let interval = setInterval(() => {
            this.drawExplosions(bomb.x, bomb.y);
        }, 10);
        setTimeout(() => {
            this.exploding = false;
            clearInterval(interval);
        }, 2000);
    }

    putBomb() {
        if (this.isEmptySpace(this.bomberman.pos.x, this.bomberman.pos.y)) {
            this.bombs.push(new Bomb(this.bomberman.pos, this));
            this.maze[this.bomberman.pos.y][this.bomberman.pos.x] = 3;
            this.numBombs++;
        }
    }

    verify(enemysDead) {
        if (enemysDead)
            this.finishGame(this.states.win);
        if (this.numBombs > this.maxBombs)
            this.finishGame(this.states.dead);
        if (![0, 3].includes(this.maze[this.bomberman.pos.y][this.bomberman.pos.x]))
            this.finishGame(this.states.dead);
    }


    finishGame(state) {
        this.state = state;
        this.finish = true;
    }

    drawBlocks() {
        for (let i = 1; i < this.maze.length - 1; i++) {
            for (let j = 1; j < this.maze[i].length - 1; j++) {
                if (this.maze[i][j] == 2)
                    image(this.imgs.block, this.size * j, this.size * i, this.size, this.size);

                if (!this.exploding)
                    if (this.maze[i][j] == 4)
                        this.maze[i][j] = 0;

            }
        }
    }

    drawBombs() {
        for (let i = this.bombs.length - 1; i >= 0; i--) {
            if (this.bombs[i].isAlive)
                image(this.imgs.bomb, this.bombs[i].x * this.size, this.bombs[i].y * this.size, this.size, this.size);
        }

    }

    drawExplosions(x, y) {
        if (!this.finish) {
            if (this.maze[y][x] == 4) {
                image(this.imgs.exp_center, this.size * x, this.size * y, this.size, this.size);
                if (this.maze[y - 1][x] != 1) {
                    image(this.imgs.exp_vertical, this.size * x, this.size * (y - 1), this.size, this.size);
                    this.maze[y - 1][x] = 4;
                }
                if (this.maze[y + 1][x] != 1) {
                    image(this.imgs.exp_vertical, this.size * x, this.size * (y + 1), this.size, this.size);
                    this.maze[y + 1][x] = 4;
                }
                if (this.maze[y][x + 1] != 1) {
                    image(this.imgs.exp_horizontal, this.size * (x + 1), this.size * y, this.size, this.size);
                    this.maze[y][x + 1] = 4;
                }
                if (this.maze[y][x - 1] != 1) {
                    image(this.imgs.exp_horizontal, this.size * (x - 1), this.size * y, this.size, this.size);
                    this.maze[y][x - 1] = 4;
                }
            }
        }
    }

    drawEnemys() {
        let enemyCount = 0;
        for (let i = this.enemys.length - 1; i >= 0; i--) {
            if (this.enemys[i].isAlive) {
                this.enemys[i].draw();
                enemyCount++;
            }
            if (this.enemys[i].pos.x == this.bomberman.pos.x &&
                this.enemys[i].pos.y == this.bomberman.pos.y) {
                this.finishGame(this.states.dead);
                return false;
            }
        }
        this.numEnemys = enemyCount;
        return enemyCount == 0;
    }

    drawScores() {
        this.bombsLeftElement.html(this.maxBombs - this.numBombs);
        this.enemysKilledElement.html(this.maxEnemys - this.numEnemys);
    }

    drawBomberman() {
        this.bomberman.draw();
    }

    draw() {
        this.drawScores();
        if (!this.finish) {
            image(this.img, 0, 0, this.size * this.grid.width, this.size * this.grid.height);
            this.drawBlocks();
            this.drawBombs();
            this.drawScores();
            this.drawBomberman();
            let enemysDead = this.drawEnemys();
            this.verify(enemysDead);
        } else {
            image(this.state === this.states.win ? this.imgs.win : this.imgs.game_over, 0, 0, this.size * this.grid.width, this.size * this.grid.height);
        }
    }

}