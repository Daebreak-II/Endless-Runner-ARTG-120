class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    

    preload() {
        // load images/tile sprites
        this.load.image('playerUI', './Assets/sprites/playUI.png');
        this.load.image('playerShip', './Assets/sprites/playerShip.png');
        this.load.image('rock', './Assets/sprites/rock.png');
        this.load.image('treasure', './Assets/sprites/treasure.png');
        this.load.image('waterbackground', './Assets/sprites/waterbackground.png');
        this.load.image('steeringWheel', './Assets/sprites/wheel.png');
        this.load.image('enemyShip', './Assets/sprites/enemyShip.png');
        this.load.image('enemyCannonBall', './Assets/sprites/enemycannonball.png');
        this.load.image('playerCannonBall', './Assets/sprites/playercannonball.png');
        this.load.image('playUI', './Assets/sprites/gameUI.png');
        this.load.audio('music', './Assets/sfx/Traveling Through the Endless Ocean.mp3');
        this.load.audio('shipDamage', './Assets/sfx/Ship_Breaking_Down.wav');
        this.load.audio('shipCreaking', './Assets/sfx/Ship_Creaking.wav');
        this.load.audio('treasurePickup', './Assets/sfx/Treasure_Picked_Up.mp3');
        this.load.audio('gameOver', './Assets/sfx/Game_Over.mp3');
        this.load.audio('shipCreak', './Assets/sfx/Ship_Creaking.wav');
        this.load.audio('wave1', './Assets/sfx/Wave_Crashing_1.wav');
        this.load.audio('wave2', './Assets/sfx/Wave_Crashing_2.wav');
        this.load.audio('wave3', './Assets/sfx/Wave_Crashing_3.wav');
        this.load.audio('playerCannon', './Assets/sfx/PlayerCannonballShot.mp3');
        this.load.audio('rockBreaking', './Assets/sfx/RockBreaking.wav');
        this.load.audio('enemyShipDamage', './Assets/sfx/EnemyShipBreaking.wav');
        this.load.audio('treasureDamage', './Assets/sfx/Cannonball_Pick_Up.mp3');
        
    }

    create() {
        //const child = this.children.getAt(0);
        // place tile sprite
        this.ocean = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'waterbackground').setOrigin(0, 0);
        
        //this.children.depthSort(this.PlayersUI);
        /*
        // black borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        */

        // fixes tilemap tearing
        // this.cameras.roundPixels = true;

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // adding in and initializing game objects
        // add ship (p1)
        this.ship = new PlayerShip(this, game.config.width/2, game.config.height - (borderUISize * 4) - borderPadding, 'playerShip', 0).setOrigin(0.5, 0.5);
        this.ship.setScale(0.15 * spriteScale);
        this.ship.setSize(this.ship.width * 2/3, this.ship.height * 2/3);

        // add rocks
        this.rockGroup = this.physics.add.group();
        this.rockGroup.runChildUpdate = true;

        this.rock01 = new Rock(this, game.config.width * 1/4, 0 - game.config.height * 1/3, 'rock', 0).setOrigin(0.5, 0);
        this.rock02 = new Rock(this, game.config.width * 3/4, 0 - game.config.height * 1, 'rock', 0).setOrigin(0.5, 0);
        this.rock03 = new Rock(this, game.config.width * 1/4, 0 - game.config.height * 5/3, 'rock', 0).setOrigin(0.5, 0);
        
        this.rockGroup.add(this.rock01);
        this.rockGroup.add(this.rock02);
        this.rockGroup.add(this.rock03);

        this.rock01.setScale(0.5 * spriteScale);
        this.rock02.setScale(0.5 * spriteScale);
        this.rock03.setScale(0.5 * spriteScale);
        this.rock01.setSize(this.rock01.width * 2/3, this.rock01.height * 1/2);
        this.rock02.setSize(this.rock02.width * 2/3, this.rock02.height * 1/2);
        this.rock03.setSize(this.rock02.width * 2/3, this.rock02.height * 1/2);
        
        // add treasure 
        this.treasure = new Treasure(this, game.config.width / 2, 0 - game.config.height + borderUISize + borderPadding, 'treasure', 0).setOrigin(0.5, 0);
        this.treasure.setScale(0.2 * spriteScale);
        // this.treasure.setSize(this.treasure.width * 3/4, this.treasure.height * 3/4);

        // adding in enemy ship
        this.enemyShip = new EnemyShip(this, game.config.width * 1/2, 0 - game.config.height * 1.3, 'enemyShip', 0).setOrigin(0.5, 0.5);
        this.enemyShip.setScale(0.15 * spriteScale);
        this.enemyShip.setSize(this.enemyShip.width * 1.1, this.enemyShip.height * 0.45);
        this.enemyShip.setAngle(90);

        // adding groups for cannonBalls
        this.pCannonBalls = this.physics.add.group();
        this.pCannonBalls.runChildUpdate = true;


        // adding in steering wheel, as a sprite
        this.wheel = this.add.sprite(game.config.width / 2, game.config.height / 2 ,'steeringWheel');
        this.wheel.setScale(0.75);
        //this.playersUI = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'playerUI').setOrigin(0, 0);

        // logging initial mouse angle
        oldAngle = Phaser.Math.Angle.Between(this.wheel.x, this.wheel.y, this.input.x, this.input.y);

        // font for the text (not final)
        let scoreConfig = {
            fontFamily: 'Monotype Corsiva',
            fontSize: '36px',
            color: '#000',
            stroke: '#000',
            strokeThickness: 2,
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            width: 100
        }

        let multiplierConfig = {
            fontFamily: 'Monotype Corsiva',
            fontSize: '28px',
            color: '#000',
            stroke: '#000',
            strokeThickness: 2,
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            width: 100
        }

        // play music
        this.musicPlaying = this.sound.add("music", { volume: 0.5 * volumeMultiplier, loop: true });
        this.musicPlaying.play();

        // player UI

        this.playerUI = this.add.sprite(game.config.width / 2, 60, 'playUI');

        //Making the score show up
        scoreCounter = 0;
        this.bonusScore = 0;
        this.finalScore = 0;
        this.scoreText = this.add.text(borderUISize + borderPadding + 350, borderUISize + borderPadding*2 + 23, scoreCounter, scoreConfig);
        this.lifesRemaining = this.add.text(borderUISize + borderPadding + 665, borderUISize + borderPadding*2 + 7, playerHealth, scoreConfig);
        this.scoreMultiplierText = this.add.text(borderUISize + borderPadding + 497, borderUISize + borderPadding*2 - 10, scoreMultiplier + 'x', multiplierConfig);
        this.timerShowing = this.add.text(borderUISize + borderPadding + 25, borderUISize + borderPadding*2 + 7, timeValue + 's', scoreConfig);
        //making a game over check
        this.gameOver = false;
    }

    update(time, delta) {
        // scroll background
        this.ocean.tilePositionY -= scrollSpeed + 1;
        // this.background.y = Math.round(this.background.y);

        // restart game option 'r'
        // TODO make sure restarting the game is a true restart
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.musicPlaying.stop();
            this.scene.restart();
            playerHealth = 3;
            playerInvincible = false;
            shipVelocity = 0;
            scoreMultiplier = 1;
            CannonOnCooldown = false;
        }

        if(!this.gameOver){
            this.checkForGameOver();
        
            // adding to the score
            this.finalScore += delta;
            timeValue = Math.floor(this.finalScore / 1000);
            scoreCounter = Math.floor(this.finalScore / 1000) + this.bonusScore;
            this.scoreText.text = scoreCounter;

            // Checking your highest multiplier
            if(scoreMultiplier > highestMultiplier){
                highestMultiplier = scoreMultiplier;
            }

            this.scoreMultiplierText.text = scoreMultiplier + 'x';
            this.timerShowing.text = timeValue + 's'

            // math for linking wheel turning to ship velocity
            let newAngle = Phaser.Math.Angle.Between(this.wheel.x, this.wheel.y, this.input.x, this.input.y);
        

            // turning controls
            if (game.input.activePointer.leftButtonDown()) {
                this.wheel.setRotation(newAngle + Math.PI / 2);
                // change velocity based off change in mouse angle, special case for going from 180 to -180 and vice versa
                if ( (oldAngle - newAngle) > 3 || (oldAngle - newAngle) < -3) {
                    shipVelocity -= (oldAngle + newAngle) * 20;
                } else {
                    shipVelocity -= (oldAngle - newAngle) * 20;
                }
            }

            // firing canon Ball
            if (Phaser.Input.Keyboard.JustDown(keyF) && CannonOnCooldown == false) {
                CannonOnCooldown = true;
                this.pCannonBall = new PlayerCannonBall(this, this.ship.x, this.ship.y, 'playerCannonBall', 0).setOrigin(0.5, 0.5);
                this.pCannonBall.setScale(0.1 * spriteScale);
                // this.pCannonBall.setSize(this.pCannonBall.width * spriteScale, this.pCannonBall.height * spriteScale);
                this.pCannonBalls.add(this.pCannonBall);
                this.sound.play('playerCannon', {volume: 2 * volumeMultiplier});
                this.clock = this.time.delayedCall(1000, () => {
                    CannonOnCooldown = false;
                }, null, this);
            }


            // limiters on ship's velocity
            if (shipVelocity >= 500) {
                shipVelocity = 500;
            } else if (shipVelocity <= -500) {
                shipVelocity = -500;
            }
            oldAngle = newAngle;
        
            // Updating objects, groups automatically updated
            this.treasure.update();
            this.ship.update();
            this.enemyShip.update();

            // speed up game based on time
            scrollSpeed = 4 + (this.finalScore / 30000);
        }

        // Checking Collisions
        // hitting rock
        if(this.physics.collide(this.ship, this.rockGroup)) {
            if(!playerInvincible) {
                playerInvincible = true;
                playerHealth -= 1;
                this.cameras.main.shake(200, 0.01);
                this.ship.setAlpha(0.7);
                this.lifesRemaining.text = playerHealth;
                this.sound.play('shipDamage', {volume: 0.5 * volumeMultiplier});
                this.clock = this.time.delayedCall(2000, () => {
                    this.ship.setAlpha(1);
                    playerInvincible = false;
                }, null, this);
            }
        }

        // pickup treasure
        if(this.physics.collide(this.ship, this.treasure)) {
            this.treasure.y = 0 - this.treasure.height - game.config.height;
            this.treasure.x = Phaser.Math.Between(borderUISize + borderPadding + this.treasure.width, game.config.width - borderUISize - borderPadding - this.treasure.width);
            this.bonusScore += 10 * scoreMultiplier;
            scoreMultiplier += 0.5;
            this.sound.play('treasurePickup', {volume: 1.3 * volumeMultiplier});
        }

        // running into enemy Ship
        if (this.physics.collide(this.ship, this.enemyShip) && playerInvincible == false) {
            playerInvincible = true;
            playerHealth -= 1;
            this.enemyShip.respawn();
            this.cameras.main.shake(200, 0.01);
            this.ship.setAlpha(0.7);
            this.lifesRemaining.text = playerHealth;
            this.sound.play('shipDamage', {volume: 0.5 * volumeMultiplier});
            this.sound.play('enemyShipDamage', {volume: 0.5 * volumeMultiplier});
            this.clock = this.time.delayedCall(2000, () => {
                this.ship.setAlpha(1);
                playerInvincible = false;
            }, null, this);
        }

        // enemy ship hitting rock
        if (this.physics.collide(this.rockGroup, this.enemyShip)) {
            if(this.enemyShip.y >= 0) {
                this.enemyShip.respawn();
                this.sound.play('enemyShipDamage', {volume: 0.5 * volumeMultiplier});
            } else {
                this.enemyShip.respawn();
            }
        }

        // cannonball hitting rock, might not destroy the right canonBall
        if (this.physics.collide(this.pCannonBalls, this.rockGroup)) {
            this.pCannonBalls.remove(this.pCannonBalls.getFirstAlive(), true, true);
            this.sound.play('rockBreaking', {volume: 0.25 * volumeMultiplier});
        }
    
        // cannonball hitting enemy ship
        if (this.physics.collide(this.pCannonBalls, this.enemyShip)) {
            this.enemyShip.respawn();
            this.pCannonBalls.remove(this.pCannonBalls.getFirstAlive(), true, true);
            this.bonusScore += 10 * scoreMultiplier;
            this.sound.play('enemyShipDamage', {volume: 0.5 * volumeMultiplier});
        }

        // cannonball hitting Treasure
        if (this.physics.collide(this.pCannonBalls, this.treasure)) {
            this.pCannonBalls.remove(this.pCannonBalls.getFirstAlive(), true, true);
            this.treasure.respawn();
            this.sound.play('treasureDamage', {volume: 1.5 * volumeMultiplier});
        } 

        // respawn rocks so they don't overlap
        if(this.physics.collide(this.rock01, this.rock02)) {
            this.rock01.respawn();
        }
        if(this.physics.collide(this.rock01, this.rock03)) {
            this.rock01.respawn();
        }
        if(this.physics.collide(this.rock02, this.rock03)) {
            this.rock02.respawn();
        }

        // play a random wave sfx every 10 seconds
        if(!waveSfx && !this.gameOver) {
            waveSfx = true;
            let sfx = Phaser.Math.Between(1, 4);
            if(sfx <= 1) {
                this.sound.play('wave1', {volume: 0.5 * volumeMultiplier});
            } else if(sfx <= 2) {
                this.sound.play('wave2', {volume: 0.5 * volumeMultiplier});
            } else if (sfx <= 3) {
                this.sound.play('wave3', {volume: 0.5 * volumeMultiplier});
            } else {
                this.sound.play('shipCreak', {volume: 0.5 * volumeMultiplier})
            }
            this.clock = this.time.delayedCall(10000, () => {
                waveSfx = false;
            }, null, this);
        }

    }

    checkForGameOver(){

        if(playerHealth <= 0){
            this.ship.destroy();
            if(scoreCounter > highScore) {
                highScore = scoreCounter;
            }
            
            this.gameOver = true;
            this.musicPlaying.stop();
            this.ocean.tilePositionY = 0;
            this.sound.play('gameOver', { volume: 1 * volumeMultiplier });
            this.scene.start("gameOverScene");
        }
    }

}

