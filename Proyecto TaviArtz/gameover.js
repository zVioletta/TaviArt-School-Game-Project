class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
        console.log('In Constructor: GameOver');
    }
    
    preload() {
        this.load.image("Go_Background", "resources/GameOver/GameOver.jpg");
    }

    create() {
        this.add.tileSprite(576, 324, 1152, 648, "Go_Background");
    }

    update() {
    }
}