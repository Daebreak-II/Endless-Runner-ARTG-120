class Options extends Phaser.Scene {
    constructor() {
      super("optionScene");
    }

    preload(){
      this.load.image('right', './Assets/sprites/rightarrow.png');
      this.load.image('play', './Assets/sprites/playButton.png');
      this.load.image('leftarrow', './Assets/sprites/leftarrow.png');
      this.load.image('background', './Assets/sprites/waterbackground.png');
      this.load.image('toMenu', './Assets/sprites/mainmenubutton.png');
      this.load.audio('selected', './Assets/sfx/Selection.mp3');
      this.load.audio('menuChoice', './Assets/sfx/Moving_to_a_different_selection.wav');
    }
    
    create() {
        //this.add.text(20, 20, "Menu");
        //this.scene.start("playScene");

        //setting up main meny screen images
        this.optionImage = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);

        //Setting text for the options
        let optionsConfig = {
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
        this.soundVolume = this.add.text(50, 100, 'Volume: ');

        //setting up options in menu
        this.selectPlay = this.add.sprite(250, game.config.height/2 - 4, 'play').setOrigin(0, 0);
        this.selectPlay.setScale(0.5);

        this.mousePlay = this.selectPlay.setInteractive();


        this.selectOptions = this.add.image(250, game.config.height/2 + 305, 'quit').setOrigin(0, 0);
        this.selectOptions.setScale(0.5);

        this.mouseOptions = this.selectOptions.setInteractive();
        
        this.mousePointerisOverPlay = false;

        this.mousePointerisOverOptions = false;
  
        //setting up mouse cursor over object
        this.mousePlay.on('pointerover', () => { 
          this.mousePointerisOverPlay = true;
          this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        
        this.mousePlay.on('pointerout', () => { 
          this.mousePointerisOverPlay = false; 
        });

        this.mouseOptions.on('pointerover', () => { 
          this.mousePointerisOverOptions = true;
          this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        this.mouseOptions.on('pointerout', () => { 
          this.mousePointerisOverOptions = false;
          
          //this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        
    }
    update(){
      
      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverPlay){
        //console.log('Is mouse working?');
        this.scene.start("playScene");
        //this.scene.start("gameOverScene");
        this.sound.play('selected', {volume: 1 * volumeMultiplier});
      }

      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverOptions){
        //console.log('Is mouse working?');
        //this.scene.start("playScene");
        this.sound.play('selected', {volume: 1 * volumeMultiplier});
        this.sys.game.destroy(true);
      }


      
                      
    }
}
  