/*
Forever Ahoy

contrubuters:
Riley Dix - Producer
Keenan Rea - Head Programmer
Juan Alverado - UI Programming and Design, Sound Designer
Max Mollison - Head Artist

completed 5/3/2021

Creative Tilt:
The main technical creative tilt for this game was centered around our design 
pillar of trying to make the player feel like they were piloting a slow, 
unweidly ship. This resulted in the momentum-based movement system,
and the wheel to control it. As opposed to simply using the arrow keys to
move right and left (which is also implemented in the game as an accessability 
option), the player must click and drag around the wheel to turn the 
wheel right and left in order to turn. Turning the wheel faster or slower
also affects how fast the ship turns.

The visual design of this game revolved around pirates and the open sea.
This means the art had to revolve around wood and water, so the color
scheme had to mostly be brown and blue. For the menus, we used wooden signs 
for each of the buttons, and these signs were on a beach with an ocean in the background
so the two colors would fit together without seeming out of place. 
The menus are also a creative way to start and end the game since the beach
marks the entrance and exit to the ocean, where the game takes place. As for the game, we used
a blue UI so that when the player is out to sea, the UI meshes with the
open waters, which helps the players stay immersed. We also made objects that the player
interacts with blend with the water by curving the bottom of the item, whether it be
a treasure chest or a rock, to simulate waves hitting the item.

The music also had to follow a good amount of the pirate feel so it was made from scrach
with the idea of repition to almost have a sea shanti feel to it. The sound effects also 
follow this theming by using pirate sound clips and sounds of wind and breaking wood.

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

