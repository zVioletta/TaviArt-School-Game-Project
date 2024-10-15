var config = {
    type: Phaser.AUTO,
    width: 1152, //! 960x480px 
    height: 648,
    backgroundColor: '#4488aa',
    scene: [Scene1, GameOver],
    useTicker: true,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 300 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

var game = new Phaser.Game(config);