class GameOver extends Phaser.Scene {
    constructor() {
      super("gameOverScene");
    }

    preload(){
      this.load.image('gameOver', './Assets/sprites/gameover.png');
      this.load.image('playAgain', './Assets/sprites/playagainbutton.png');
      this.load.image('gameOverquit', './Assets/sprites/gameoverquitbutton.png');
      this.load.image('backToMenu', './Assets/sprites/mainmenubutton.png');
      this.load.image('quitGameOver', './Assets/sprites/gameoverquitbutton.png');
      this.load.audio('selected', './Assets/sfx/Selection.mp3');
      this.load.audio('menuChoice', './Assets/sfx/Moving_to_a_different_selection.wav');
    }
    
    create() {
        //this.add.text(20, 20, "Game Over");
        this.gameOverImage = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'gameOver').setOrigin(0, 0);

        this.selectPlayAgain = this.add.sprite(35, game.config.height/2 + 245, 'playAgain').setOrigin(0, 0);
        this.selectPlayAgain.setScale(0.5);

        this.mousePlayAgain = this.selectPlayAgain.setInteractive();


        this.selectMenu = this.add.sprite(532, game.config.height/2 + 265, 'backToMenu').setOrigin(0, 0);
        this.selectMenu.setScale(0.5);

        this.selectQuit = this.add.sprite(280, game.config.height/2 + 315, 'quitGameOver').setOrigin(0, 0);
        this.selectQuit.setScale(0.5);

        this.mouseMenu = this.selectMenu.setInteractive();

        this.mouseQuit = this.selectQuit.setInteractive();
        
        this.mousePointerisOverPlayAgain = false;

        this.mousePointerisOverMenu = false;

        this.mousePointerisOverQuit = false;
  
        //setting up mouse cursor over object
        this.mousePlayAgain.on('pointerover', () => { 
          this.mousePointerisOverPlayAgain = true;
          this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        
        this.mousePlayAgain.on('pointerout', () => { 
          this.mousePointerisOverPlayAgain = false; 
        });

        this.mouseMenu.on('pointerover', () => { 
          this.mousePointerisOverMenu = true;
          this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        this.mouseMenu.on('pointerout', () => { 
          this.mousePointerisOverMenu = false;
          
          //this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });

        this.mouseQuit.on('pointerover', () => { 
          this.mousePointerisOverQuit = true;
          this.sound.play('menuChoice', {volume: 1 * volumeMultiplier}); 
        });
        
        this.mouseQuit.on('pointerout', () => { 
          this.mousePointerisOverQuit = false; 
        });

        // putting the scores and times in th game over screen
        let gameOverText = {
          fontFamily: 'Monotype Corsiva',
          fontSize: '36px',
          color: '#000000',
          align: 'left',
          padding: {
              top: 5,
              bottom: 5,
          },
          width: 100
        }
        this.gameOverScore = this.add.text(game.config.width / 2 + 25, game.config.height / 2 - 250, scoreCounter, gameOverText);
        this.timeShow = this.add.text(game.config.width / 2 + 25, game.config.height / 2 - 170, timeValue + 's', gameOverText);
        this.multiplierShow = this.add.text(game.config.width / 2 + 25, game.config.height / 2 - 85, highestMultiplier + 'x', gameOverText);
        this.highScoreShow = this.add.text(game.config.width / 2 + 25, game.config.height / 2 - 5, highScore, gameOverText);
    }

    update(){
      
      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverPlayAgain){
        //this.scene.start("playScene");
        playerHealth = 3;
        playerInvincible = false;
        shipVelocity = 0;
        CannonOnCooldown = false;
        timeValue = 0;
        scoreMultiplier = 1;
        this.scene.start("playScene");
        this.sound.play('selected', {volume: 1 * volumeMultiplier});
      }

      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverMenu){
        playerHealth = 3;
        playerInvincible = false;
        shipVelocity = 0;
        timeValue = 0;
        scoreMultiplier = 1;
        this.scene.start("menuScene");
        this.sound.play('selected', {volume: 1 * volumeMultiplier});
        //this.sys.game.destroy(true);
      }
      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverQuit){
        //console.log('Is mouse working?');
        //this.scene.start("playScene");
        this.sound.play('selected', {volume: 1 * volumeMultiplier});
        this.sys.game.destroy(true);
      }                 
    }
  }