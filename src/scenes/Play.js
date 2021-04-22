class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    

    preload() {
        // load images/tile sprites
        this.load.image('playerShip', './assets/playerShip.png');
        this.load.image('rock', './assets/Rock.png');
        this.load.image('waterbackground', './assets/waterbackground.png');
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
        this.ship = new PlayerShip(this, game.config.width/2, game.config.height / 2, 'PlayerShip').setOrigin(0.5, 0);
    
      // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.ocean.tilePositionY -= 4;

        this.ship.update();
      }
  }

