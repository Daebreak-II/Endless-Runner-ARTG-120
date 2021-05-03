/*
Forever Ahoy

contrubuters:
Riley Dix - Producer
Keenan Rea - Head Programmer
Juan Alverado - UI Programming and design, sound designer
Max Mollison - Head Artist

completed 5/3/2021

Creative Tilt:
The main technical creative tilt for this game was centered around our design pillar
of trying to make the player feel like they were piloting a slow, 
unweidly ship. This resulted in the momentum-based movement system,
and the wheel to control it. As opposed to simply using the arrow keys to
move right and left (which is also implemented in the game as an easy mode
alternative), the player must click and drag around the wheel to turn the 
wheel right and left in order to turn. Turning the wheel faster or slower
also affects how fast the ship turns.



*/

let config = {
    type: Phaser.CANVAS,
    width: 800,  // originally 480
    height: 1000,  // originally 600
    scene: [ Menu, Play, Options, GameOver, Controls ],
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
let CannonOnCooldown = false;
let pCannonBalliter = 0;
let scoreMultiplier = 1;
let highScore = 0;
let timeValue = 0;
let highestMultiplier = 0;

let playerHealth = 3;
let playerInvincible = false;
let scoreCounter = 0;

//Control Variables

let mouseControlOn = true;
let arrowControlsOn = false;

// volume variables
let volumeMultiplier = 0.25;
let waveSfx = false;
let rockSfx = false;

