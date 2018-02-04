class Strategy {

    constructor(enemy) {
        if (!enemy)
            throw new Error('Um inimigo é obrigatório para a criação de uma estratégia');
        this.enemy = enemy;
    }

}