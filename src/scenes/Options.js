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
        this.titleOptions = this.add.text(game.config.width / 2 - 120, 0, 'Options', titleConfig);
        this.soundVolume = this.add.text(50, 200, 'Volume: ', optionsConfig);

        //setting up options in menu
        this.selectLeftVolume = this.add.sprite(250, game.config.height/2 - 4, 'leftarrow').setOrigin(0, 0);
        this.selectLeftVolume.setScale(0.5);

        this.mouseLeftVolume = this.selectLeftVolume.setInteractive();


        this.selectRightVolume = this.add.image(250, game.config.height/2 + 305, 'right').setOrigin(0, 0);
        this.selectRightVolume.setScale(0.5);

        this.mouseOptions = this.selectOptions.setInteractive();
        
        this.mousePointerisOverLeftVolume = false;

        this.mousePointerisOverOptions = false;
  
        //setting up mouse cursor over object
        this.mouseLeftVolume.on('pointerover', () => { 
          this.mousePointerisOverLeftVolume = true;
          this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        
        this.mouseLeftVolume.on('pointerout', () => { 
          this.mousePointerisOverLeftVolume = false; 
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
      
      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverLeftVolume){
        //console.log('Is mouse working?');
        if(volumeMultiplier > 0){
          volumeMultiplier -= 0.25;
          console.log(volumeMultiplier);
          this.sound.play('selected', {volume: 1 * volumeMultiplier});
        }
      }

      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverOptions){
        //console.log('Is mouse working?');
        //this.scene.start("playScene");
        this.sound.play('selected', {volume: 1 * volumeMultiplier});
        this.sys.game.destroy(true);
      }


      
                      
    }
}
  