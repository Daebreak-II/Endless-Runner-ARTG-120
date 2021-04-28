class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    

    preload() {
        // load images/tile sprites
        this.load.image('playerShip', './assets/sprites/playerShip.png');
        this.load.image('rock', './assets/sprites/Rock.png');
        this.load.image('waterbackground', './assets/sprites/waterbackground.png');
        this.load.image('steeringWheel', './assets/sprites/wheel.png');
        this.load.audio('music', './assets/sfx/Traveling Through the Endless Ocean.mp3');
        this.load.audio('shipDamage', './assets/sfx/Ship_Breaking_Down.wav');
        this.load.audio('shipCreaking', './assets/sfx/Ship_Creaking.wav');
    }

    create() {
        // place tile sprite
        this.ocean = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'waterbackground').setOrigin(0, 0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
 
        // add ship (p1)
        this.ship = new PlayerShip(this, game.config.width/2, game.config.height - (borderUISize * 2) - borderPadding, 'playerShip', 0).setOrigin(0.5, 1);
        this.ship.setScale(0.15);
        this.ship.setSize(this.ship.width * 0.15, this.ship.height * 0.15);

        // add rocks
        this.rock01 = new Rock(this, game.config.width/3, borderPadding, 'rock', 0).setOrigin(0.5, 0.5);
        this.rock02 = new Rock(this, game.config.width*2/3, game.config.height/2, 'rock', 0).setOrigin(0.5, 0.5);
        // think this fucks with the rock's hitboxes
        this.rock01.setScale(0.5);
        this.rock02.setScale(0.5);
        this.rock01.setSize(this.rock01.width * 0.5, this.rock01.height * 0.5);
        this.rock02.setSize(this.rock02.width * 0.5, this.rock02.height * 0.5);

        // adding in steering wheel, as a sprite
        this.wheel = this.add.sprite(game.config.width / 2, game.config.height - borderUISize - (borderPadding * 80) ,'steeringWheel');

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        // play music
        this.sound.play("music", { volume: 0.5, loop: true });
        
    }

    update() {
        // scroll background
        this.ocean.tilePositionY -= scrollSpeed;

        let angle = Phaser.Math.Angle.Between(this.wheel.x, this.wheel.y, this.input.x, this.input.y);
        this.wheel.setRotation(angle+Math.PI/2);
        let oldX = this.ship.x;
        this.ship.x = game.config.width / 2 + angle / Math.PI * game.config.width / 2;
        let deltaX = this.ship.x - oldX;
        this.ship.angle = deltaX * 1.5;

        this.ship.update();
        this.rock01.update();
        this.rock02.update();

        // check collisions
        if(this.checkCollision(this.ship, this.rock01)) {
            console.log('crash with rock01');
            // need to not destroy eardrums by playing this hundreds of times
            // this.sound.play('shipDamage');
        }
        if(this.checkCollision(this.ship, this.rock02)) {
            console.log('crash with rock02');
            // this.sound.play('shipDamage');
        }

    }

    checkCollision(playerShip, rock) {
        // simple AABB checking
        if (rock.x < playerShip.x + playerShip.width &&  rock.x + rock.width > playerShip.x && rock.y < playerShip.y + playerShip.height && rock.height + rock.y > playerShip.y) {
            return true;
        } else {
            return false;
        }

    }

}

