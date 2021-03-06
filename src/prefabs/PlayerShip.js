class PlayerShip extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.moveSpeed = 2; 
      this.velocity = 0;
      this.turnSpeed = 8;
    }

    update() {
      /*
      // move boat left or right, basic movement
      if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
        this.x -= this.moveSpeed;
      } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
        this.x += this.moveSpeed;
      }
      */

      if(arrowControlsOn){
        // key-based movement
        if(keyLEFT.isDown && this.velocity >= -500) {
          shipVelocity -= this.turnSpeed;
          // this sfx needs to be shorter
          // this.shipCreaking.play();
        } else if (keyRIGHT.isDown && this.velocity < 500) {
          shipVelocity += this.turnSpeed;
          // this.shipCreaking.play();
        }
      }
      


      this.velocity = shipVelocity;

      // move according to velocty if not on the edges of the screen
      if (this.velocity < 0 && this.x >= (this.width * 0.15)) {
        this.x += this.velocity / 100;
      } else if (this.velocity > 0 && this.x <= game.config.width - (this.width* 0.15)) {
        this.x += this.velocity / 100;
      }

      // rotate sprite according to velocity
      this.angle = this.velocity * 45 / 500;
    }
  }