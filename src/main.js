let config = {
    type: Phaser.CANVAS,
    width: 1000,  // originally 480
    height: 1500,  // originally 600
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

let keyF, keyR, keyLEFT, keyRIGHT;

let borderUISize = game.config.height / 45;
let borderPadding = borderUISize / 9;


