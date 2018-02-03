class Game {

    constructor() {
        this.img = loadImage('assets/background.bmp');
        this.grid = { width: 17, height: 13 }
        this.size = 40;
        this.bomberman = new Bomberman(this);
        this.exploding = false;
        this.notAllowed = [1, 2, 3];
        this.bombs = [];
        this.imgs = {
            block: loadImage('assets/block.bmp'),
            bomb: loadImage('assets/bomb.bmp'),
            exp_center: loadImage('assets/exp_center.bmp')
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
    }

    isEmptySpace(x, y) {
        return this.maze[y][x] == 0
    }


    isUsableSpace(x, y) {
        return !this.notAllowed.includes(this.maze[y][x]);
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
        setTimeout(() => {
            this.exploding = false;
        }, 2000);
    }

    putBomb() {
        if (this.isEmptySpace(this.bomberman.pos.x, this.bomberman.pos.y)) {
            this.bombs.push(new Bomb(this.bomberman.pos, this));
            this.maze[this.bomberman.pos.y][this.bomberman.pos.x] = 3;
        }
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

    drawExplosions() {
        for (let i = 1; i < this.maze.length - 1; i++) {
            for (let j = 1; j < this.maze[i].length - 1; j++) {
                if (this.maze[i][j] == 4) {
                    image(this.imgs.exp_center, this.size * j, this.size * i, this.size, this.size);
                }
            }
        }
    }

    verify() {
        if (![0, 3].includes(this.maze[this.bomberman.pos.y][this.bomberman.pos.x]))
            console.log('PERDEU');
    }

    draw() {
        image(this.img, 0, 0, this.size * this.grid.width, this.size * this.grid.height);
        this.drawBlocks();
        this.drawBombs();
        if (this.exploding)
            this.drawExplosions();
        this.verify();
        this.bomberman.draw();
    }

}