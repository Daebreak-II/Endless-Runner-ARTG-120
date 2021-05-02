let config = {
    type: Phaser.CANVAS,
    width: 800,  // originally 480
    height: 1000,  // originally 600
    scene: [ Menu, Play, GameOver ],
    physics: {
        default: 'arcade',
        arcade: {debug: false} ,
    }
}

// creating gaem
let game = new Phaser.Game(config);


// reserving keys
let keyF, keyR, keyLEFT, keyRIGHT;

// game dimension variables
let borderUISize = game.config.height / 45;
let borderPadding = borderUISize / 9;

// gameplay variables
let scrollSpeed = 4;
let spriteScale = 1;
let shipVelocity = 0;
let oldAngle = 0

let playerHealth = 3;
let playerInvincible = false;
let scoreCounter = 0;

// volume variables
let volumeMultiplier = 0.25;
let waveSfx = false;

