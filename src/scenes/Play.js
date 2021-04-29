class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    

    preload() {
        // load images/tile sprites
        this.load.image('playerShip', './Assets/sprites/playerShip.png');
        this.load.image('rock', './Assets/sprites/rock.png');
        this.load.image('treasure', './Assets/sprites/treasure.png');
        this.load.image('waterbackground', './Assets/sprites/waterbackground.png');
        this.load.image('steeringWheel', './Assets/sprites/wheel.png');
        this.load.audio('music', './Assets/sfx/Traveling Through the Endless Ocean.mp3');
        this.load.audio('shipDamage', './Assets/sfx/Ship_Breaking_Down.wav');
        this.load.audio('shipCreaking', './Assets/sfx/Ship_Creaking.wav');
        this.load.audio('treasurePickup', './Assets/sfx/Treasure_Picked_Up.mp3');
        this.load.audio('wave1', './Assets/sfx/Wave_Crashing_1.wav');
        this.load.audio('wave2', './Assets/sfx/Wave_Crashing_2.wav');
        this.load.audio('wave3', './Assets/sfx/Wave_Crashing_3.wav');
    }

    create() {
        // place tile sprite
        this.ocean = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'waterbackground').setOrigin(0, 0);

        /*
        // black borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        */

        // add ship (p1)
        this.ship = new PlayerShip(this, game.config.width/2, game.config.height - (borderUISize * 2) - borderPadding, 'playerShip', 0).setOrigin(0.5, 1);
        this.ship.setScale(0.15);
        this.ship.setSize(this.ship.width * 1, this.ship.height * 1);

        // add rocks
        this.rockGroup = this.physics.add.group();

        this.rock01 = new Rock(this, game.config.width/3, borderPadding, 'rock', 0).setOrigin(0.5, 0);
        this.rock02 = new Rock(this, game.config.width*2/3, game.config.height/2, 'rock', 0).setOrigin(0.5, 0);
        
        this.rockGroup.add(this.rock01);
        this.rockGroup.add(this.rock02);
        // think this fucks with the rock's hitboxes
        this.rock01.setScale(0.5);
        this.rock02.setScale(0.5);
        this.rock01.setSize(this.rock01.width * 0.5, this.rock01.height * 0.5);
        this.rock02.setSize(this.rock02.width * 0.5, this.rock02.height * 0.5);

        // add treasure 
        this.treasure = new Treasure(this, game.config.width / 2, borderUISize + borderPadding, 'treasure', 0).setOrigin(0.5, 0);
        this.treasure.setScale(0.3);
        this.treasure.setSize(this.treasure.width, this.treasure.height);

        // adding in steering wheel, as a sprite
        this.wheel = this.add.sprite(game.config.width / 2, game.config.height - borderUISize - (borderPadding * 80) ,'steeringWheel');

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        // play music
        this.musicPlaying = this.sound.add("music", { volume: 0.5, loop: true });
        this.musicPlaying.play();

        // logging initial mouse angle
        oldAngle = Phaser.Math.Angle.Between(this.wheel.x, this.wheel.y, this.input.x, this.input.y);
        // font for the text (not final)
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            width: 100
        }
        //making a game over check
        this.gameOver = false;

        //Making the score show up
        this.scoreCounter = 0;
        this.bonusScore = 0;
        this.finalScore = 0;
        this.scoreText = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.scoreCounter, scoreConfig);
        this.lifesRemaining = this.add.text(borderUISize + borderPadding + 510, borderUISize + borderPadding*2, 'Health Left: ' + playerHealth, scoreConfig);
    }

    update(time, delta) {
        // scroll background
        this.ocean.tilePositionY -= scrollSpeed + 1;


        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
            playerHealth = 3;
            playerInvincible = false;
            
        }

        if(this.gameOver){
            this.musicPlaying.stop();
            this.ocean.tilePositionY = 0;
        }

        if(!this.gameOver){
            this.checkForGameOver();
        
            // adding to the 
            this.finalScore += delta;
            this.scoreCounter = Math.floor(this.finalScore / 1000) + this.bonusScore;
            this.scoreText.text = this.scoreCounter;
        

            // math for linking wheel turning to ship velocity
            let newAngle = Phaser.Math.Angle.Between(this.wheel.x, this.wheel.y, this.input.x, this.input.y);
        

            if (game.input.activePointer.leftButtonDown()) {
                this.wheel.setRotation(newAngle + Math.PI / 2);
                // change velocity based off change in mouse angle, special case for going from 180 to -180 and vice versa
                if ( (oldAngle - newAngle) > 3 || (oldAngle - newAngle) < -3) {
                    shipVelocity -= (oldAngle + newAngle) * 20;
                } else {
                    shipVelocity -= (oldAngle - newAngle) * 20;
                }
            }


            // limiters on ship's velocity
            if (shipVelocity >= 500) {
                shipVelocity = 500;
            } else if (shipVelocity <= -500) {
                shipVelocity = -500;
            }
            oldAngle = newAngle;
        
            this.rock01.update();
            this.rock02.update();
            this.treasure.update();
            this.ship.update();

            // speed up game based on time
            scrollSpeed = 4 + (this.finalScore / 30000);
        }

        // check collisions
        // hitting rock
        if(this.physics.collide(this.ship, this.rockGroup)) {
            if(!playerInvincible) {
                playerInvincible = true;
                playerHealth -= 1;
                this.ship.setAlpha(0.7);
                this.lifesRemaining.text = 'Health Left: ' + playerHealth;
                this.sound.play('shipDamage', {volume: 0.5});
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
            this.bonusScore += 10;
            this.sound.play('treasurePickup', {volume: 1});
            this.clock = this.time.delayedCall(10000, () => {

            }, null, this);
        }

        // play a random wave sfx every 10 seconds, based off of score counter
        if(this.scoreCounter % 10 == 0) {
            let sfx = Phaser.Math.Between(1,3);
            if(sfx <= 1) {
                this.sound.play('wave1', {volume: 1});
            } else if( sfx <= 2) {
                this.sound.play('wave2', {volume: 1});
            } else {
                this.sound.play('wave3', {volume: 1});
            }
        }

    }
    checkForGameOver(){

        if(playerHealth <= 0){
            this.ship.destroy();
            
            
            let scoreConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'center',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                Width: 100
            }
            // This should be changed to look more like the game should look like
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            this.sound.play('gameOver', { volume: 1 });
        }
    }

}

