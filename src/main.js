let config = {
    type: Phaser.CANVAS,
    width: 800,  // originally 480
    height: 1000,  // originally 600
    scene: [ Menu, Play, Options, GameOver ],
    physics: {
        default: 'arcade',
        arcade: {debug: true} ,
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
let CannonOnCooldown = false;
let pCannonBalliter = 0;
let scoreMultiplier = 1;
let highScore = 0;
let timeValue = 0;
let highestMultiplier = 0;

let playerHealth = 3;
let playerInvincible = false;
let scoreCounter = 0;

// volume variables
let volumeMultiplier = 0.25;
let waveSfx = false;

