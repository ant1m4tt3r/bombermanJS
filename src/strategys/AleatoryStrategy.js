class AleatoryStrategy extends Strategy {

    run() {
        let x = this.enemy.pos.x;
        let y = this.enemy.pos.y;
        if (random() > 0.5)
            x += round(random(-1, 1));
        else
            y += round(random(-1, 1));

        if (this.enemy.game.isUsableSpace(x, y))
            this.enemy.pos = { x, y };
        else this.run();
    }

}