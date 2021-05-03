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
            fontSize: '42px',
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

        this.selectPlay = this.add.sprite(250, game.config.height/2 + 300, 'play').setOrigin(0, 0);
        this.selectPlay.setScale(0.5);

        this.mousePlay = this.selectPlay.setInteractive();

        
        this.titleOptions = this.add.text(game.config.width / 2 - 120, 0, 'Options', titleConfig);
        this.soundVolume = this.add.text(50, 200, 'Volume: ', optionsConfig);

        //setting up options in menu
        this.selectLeftVolume = this.add.sprite(225, game.config.height/2 - 300, 'leftarrow').setOrigin(0, 0);
        this.selectLeftVolume.setScale(0.5);

        this.mouseLeftVolume = this.selectLeftVolume.setInteractive();


        this.selectRightVolume = this.add.image(500, game.config.height/2 - 300, 'right').setOrigin(0, 0);
        this.selectRightVolume.setScale(0.5);

        this.mouseRightVolume = this.selectRightVolume.setInteractive();

        this.mousePointerisOverPlay = false;
        
        this.mousePointerisOverLeftVolume = false;

        this.mousePointerisOverRightVolume = false;
  
        //setting up mouse cursor over object
        this.mouseLeftVolume.on('pointerover', () => { 
          this.mousePointerisOverLeftVolume = true;
          this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        
        this.mouseLeftVolume.on('pointerout', () => { 
          this.mousePointerisOverLeftVolume = false; 
        });

        this.mouseRightVolume.on('pointerover', () => { 
          this.mousePointerisOverRightVolume = true;
          this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        this.mouseRightVolume.on('pointerout', () => { 
          this.mousePointerisOverRightVolume = false;
          
          //this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        this.mousePlay.on('pointerover', () => { 
          this.mousePointerisOverPlay = true;
          this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        this.mousePlay.on('pointerout', () => { 
          this.mousePointerisOverPlay = false; 
        });

        this.volumeLevel = this.add.text(365, game.config.height/2 - 300, volumeMultiplier, optionsConfig);

        // Selection for controls
        this.selectLeftControls = this.add.sprite(325, game.config.height/2 - 100, 'leftarrow').setOrigin(0, 0);
        this.selectLeftControls.setScale(0.5);

        this.mouseLeftControls = this.selectLeftControls.setInteractive();


        this.selectRightControls = this.add.image(600, game.config.height/2 - 100, 'right').setOrigin(0, 0);
        this.selectRightControls.setScale(0.5);

        this.mouseRightControls = this.selectRightControls.setInteractive();

        this.mousePointerisOverLeftControls = false;

        this.mousePointerisOverRightControls = false;
  
        //setting up mouse cursor over object
        this.mouseLeftControls.on('pointerover', () => { 
          this.mousePointerisOverLeftControls = true;
          this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        
        this.mouseLeftControls.on('pointerout', () => { 
          this.mousePointerisOverLeftControls = false; 
        });

        this.mouseRightControls.on('pointerover', () => { 
          this.mousePointerisOverRightControls = true;
          this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        this.mouseRightControls.on('pointerout', () => { 
          this.mousePointerisOverRightControls = false;
          
          //this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });

        this.mouseAreOn = "Mouse";
        this.arrowsOn = "Arrow Keys";
        if(mouseControlOn){
          this.controlText = this.add.text(400, game.config.height/2 - 100, this.mouseAreOn, optionsConfig);
        }
        if(arrowControlsOn){
          this.controlText = this.add.text(400, game.config.height/2 - 100, this.arrowsOn, optionsConfig);
        }
        this. controlOptions= this.add.text(50, game.config.height/2 - 100, 'Control Scheme: ', optionsConfig);
    }
    update(){
      
      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverLeftVolume){
        //console.log('Is mouse working?');
        if(volumeMultiplier > 0){
          volumeMultiplier -= 0.25;
          this.volumeLevel.text = volumeMultiplier;
          this.sound.play('selected', {volume: 1 * volumeMultiplier});
        }
      }

      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverRightVolume){
        volumeMultiplier += 0.25;
        this.volumeLevel.text = volumeMultiplier;
        this.sound.play('selected', {volume: 1 * volumeMultiplier});
      }

      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverLeftControls){
        //console.log('Is mouse working?');
        mouseControlOn = true;
        arrowControlsOn = false;
        console.log(mouseControlOn);
        console.log(arrowControlsOn);
        this.controlText.text = this.mouseAreOn;

      }

      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverRightControls){
        console.log('Is mouse working?');
        mouseControlOn = false;
        arrowControlsOn = true;
        console.log(mouseControlOn);
        console.log(arrowControlsOn);
        this.controlText.text = this.arrowsOn;
      }

      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverPlay){
        //console.log('Is mouse working?');
        this.scene.start("controlScene");
        //this.scene.start("gameOverScene");
        this.sound.play('selected', {volume: 1 * volumeMultiplier});
      }


      
                      
    }
}
  