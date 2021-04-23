class PlayerShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeed = 2;
    }

    update() {
      // add or subtract speed as long as it's below a cap of +-10
      if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
        this.x -= this.moveSpeed;
      } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
        this.x += this.moveSpeed;
      }

    }
  }