let config = {
    type: Phaser.CANVAS,
    width: 480,
    height: 640,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

let keyF, keyR, keyLEFT, keyRIGHT;

let borderUISize = game.config.height / 45;
let borderPadding = borderUISize / 9;


