class Bomberman {

    constructor(game) {
        this.img_right = loadImage('assets/bomberman.bmp');
        this.img_left = loadImage('assets/bomberman_inverse.bmp');
        this.img = this.img_right;
        this.pos = { x: 1, y: 1 };
        this.game = game;
        this.size = this.game.size;
        this.update();
    }


    update(img) {
        this.location = {
            x: this.pos.x * this.size,
            y: this.pos.y * this.size
        };
        if (img) {
            if (img === 'left')
                this.img = this.img_left;
            if (img === 'right')
                this.img = this.img_right;
        }
    }

    draw() {
        image(this.img, this.location.x, this.location.y, this.size, this.size);
    }

}