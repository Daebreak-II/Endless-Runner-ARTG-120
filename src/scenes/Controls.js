class Controls extends Phaser.Scene {
    constructor() {
      super("controlScene");
    }

    preload(){
      this.load.image('background', './Assets/sprites/waterbackground.png');
      this.load.image('play', './Assets/sprites/playButton.png');
      this.load.image('steeringWheel', './Assets/sprites/wheel.png');
      this.load.image('right', './Assets/sprites/rightarrow.png');
      this.load.image('leftarrow', './Assets/sprites/leftarrow.png');
      this.load.image('rock', './Assets/sprites/rock.png');
      this.load.image('enemyShip', './Assets/sprites/enemyShip.png');
      this.load.image('treasure', './Assets/sprites/treasure.png');
      this.load.audio('selected', './Assets/sfx/Selection.mp3');
      this.load.audio('menuChoice', './Assets/sfx/Moving_to_a_different_selection.wav');
    }
    
    create() {
        //this.add.text(20, 20, "Menu");
        //this.scene.start("playScene");

        //setting up main meny screen images
        this.controlImage = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);

        //setting up options in menu
        this.selectPlay = this.add.sprite(250, game.config.height/2 + 400, 'play').setOrigin(0, 0);
        this.selectPlay.setScale(0.5);

        this.mousePlay = this.selectPlay.setInteractive();

        this.mousePointerisOverPlay = false;
  
        //setting up mouse cursor over object
        this.mousePlay.on('pointerover', () => { 
          this.mousePointerisOverPlay = true;
          this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        
        this.mousePlay.on('pointerout', () => { 
          this.mousePointerisOverPlay = false; 
        });

        //showing assets

        let controlsConfig = {
            fontFamily: 'Monotype Corsiva',
            fontSize: '34px',
            color: '#000',
            stroke: '#000',
            strokeThickness: 1,
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            width: 100
        }
        
        let titleConfig = {
            fontFamily: 'Monotype Corsiva',
            fontSize: '80px',
            color: '#000',
            stroke: '#000',
            strokeThickness: 1,
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            width: 100
        }

        this.titleControls = this.add.text(game.config.width / 2 - 120, 0, 'Controls', titleConfig);

        this.showingSteering = this.add.sprite(150, 200 ,'steeringWheel');
        this.showingSteering.setScale(0.5);

        this.leftArrow = this.add.sprite(50, 325 ,'leftarrow');
        this.leftArrow.setScale(0.5);

        this.rightArrow = this.add.sprite(250, 325 ,'right');
        this.rightArrow.setScale(0.5);
        
        this.showTreasure = this.add.sprite(150, 450, 'treasure');
        this.showTreasure.setScale(0.2);
        
        this.firstControlLine = this.add.text(300, 100 , 'Alright matey you want \n to control me ship?\n Well get that left mouse button down\n and move yer mouse around the wheel\n\n or ye can be lazy and use \nthem left and right arrow keys\n\n Remember to collect that sweet\n golden treasure all the time for\n a higher multiplier and a better score!', controlsConfig);

        // Show the bad stuff that can hurt
        this.enemyShipExample = this.add.sprite(650, 700 ,'enemyShip');
        this.enemyShipExample.setScale (0.15);

        this.rockExample = this.add.sprite(700, 850 ,'rock');
        this.rockExample.setScale(0.3);

        this.enemyLine = this.add.text(5, 575, 'Yer better be careful with this! \n They will destroy me ship!\n\n Them enemies ship can be destroyed\n with a good cannon shot by pressing F\n\n Those rocks cannot be destroy so avoid them!\n if you feel like restarting mid boating press R', controlsConfig);
        
    }
    update(){
      
      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverPlay){
        //console.log('Is mouse working?');
        this.scene.start("playScene");
        //this.scene.start("gameOverScene");
        this.sound.play('selected', {volume: 1 * volumeMultiplier});
      }      
                      
    }
}
  