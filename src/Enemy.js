class Enemy {
    constructor(game, x, y) {
        this.img = loadImage('assets/enemy.bmp');
        this.game = game;
        this.pos = { x, y };
        this.isAlive = true;
        this.size = this.game.size;
        this.update();
        this.start();
    }

    start() {
        this.interval = setInterval(() => {
            if (this.isAlive) {
                this.aleatoryStrategy();
                this.update();
            }
        }, 1000);
    }

    aleatoryStrategy() {
        let x = this.pos.x;
        let y = this.pos.y;
        if (random() > 0.5)
            x += round(random(-1, 1));
        else
            y += round(random(-1, 1));

        if (this.game.isUsableSpace(x, y))
            this.pos = { x, y };
        else this.aleatoryStrategy();
    }

    getMazePosition() {
        return this.game.maze[this.pos.y][this.pos.x];
    }

    update() {
        this.location = {
            x: this.pos.x * this.size,
            y: this.pos.y * this.size
        };
    }

    draw() {
        image(this.img, this.location.x, this.location.y, this.size, this.size);
        if (this.getMazePosition() == 4) {
            this.isAlive = false;
            clearInterval(this.interval);
            this.pos = { x: 0, y: 0 };
        }
    }

}