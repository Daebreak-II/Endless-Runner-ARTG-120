class PlayerShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeed = 2; 
      this.velocity = 0;
      this.turnSpeed = 5;
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

      // change velocity based on input, capped at 5
      if(keyLEFT.isDown && this.velocity >= -500) {
        this.velocity -= this.turnSpeed;
      } else if (keyRIGHT.isDown && this.velocity < 500) {
        this.velocity += this.turnSpeed;
      }

      // move according to velocty if not on the edges of the screen
      if (this.velocity < 0 && this.x >= borderUISize + this.width) {
        this.x += this.velocity / 100;
      } else if (this.velocity > 0 && this.x <= game.config.width - borderUISize - this.width) {
        this.x += this.velocity / 100;
      }

    }
  }