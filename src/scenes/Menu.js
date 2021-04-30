class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    preload(){
      this.load.image('menu', './Assets/sprites/mainmenu.png');
      this.load.image('play', './Assets/sprites/playButton.png');
      this.load.image('quit', './Assets/sprites/quitButton.png');
      this.load.audio('selected', './Assets/sfx/Selection.mp3');
      this.load.audio('menuChoice', './Assets/sfx/Moving_to_a_different_selection.wav');
    }
    
    create() {
        //this.add.text(20, 20, "Menu");
        //this.scene.start("playScene");

        //setting up main meny screen images
        this.menuImage = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menu').setOrigin(0, 0);

        //setting up options in menu
        this.selectPlay = this.add.sprite(250, game.config.height/2 - 4, 'play').setOrigin(0, 0);
        this.selectPlay.setScale(0.5);

        this.mousePlay = this.selectPlay.setInteractive();


        this.selectQuit = this.add.image(250, game.config.height/2 + 150, 'quit').setOrigin(0, 0);
        this.selectQuit.setScale(0.5);
        this.mousePointerisOver = false;
  
        //setting up mouse cursor over object
        this.mousePlay.on('pointerover', () => { 
          this.mousePointerisOver = true;
          this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        
    }
    update(){
      
      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOver){
        //console.log('Is mouse working?');
        this.scene.start("playScene");
        this.sound.play('selected', {volume: 1 * volumeMultiplier});
      }
      
                      
    }
}
  