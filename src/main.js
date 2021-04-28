let config = {
    type: Phaser.CANVAS,
    width: 800,  // originally 480
    height: 1000,  // originally 600
    scene: [ Menu, Play ],
    physics: {
        default: 'arcade',
    }
}

// creating gaem
let game = new Phaser.Game(config);


// reserving keys
let keyF, keyR, keyLEFT, keyRIGHT;

// variables
let borderUISize = game.config.height / 45;
let borderPadding = borderUISize / 9;

let scrollSpeed = 4;
let shipVelocity = 0;
let oldAngle = 0;


