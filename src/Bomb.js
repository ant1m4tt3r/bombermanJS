class Bomb {

    constructor(position, game) {
        this.x = position.x;
        this.y = position.y;
        this.game = game;
        this.delay = 3000;
        this.beginDestruction();
        this.isAlive = true;
    }

    beginDestruction() {
        this.timer = setTimeout(() => {
            this.destroy();
        }, this.delay);
    }

    destroy() {
        clearTimeout(this.timer);
        this.isAlive = false;
        this.game.explosion(this);
    }
}