class PlayerShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeed = 0;
    }

    update() {
      // add or subtract speed as long as it's below a cap of +-10
      if(keyLEFT.isDown && this.MoveSpeed > -10) {
        this.moveSpeed -= 1;
      } else if (keyRIGHT.isDown && this.MoveSpeed < 10) {
        this.moveSpeed += 1;
      }

      /* // change position if ship is not on the edge of the board
      if(this.moveSpeed < 0 && this.x >= borderUISize + this.width) {
        this.x += this.moveSpeed;
      } else if(this.moveSpeed > 0 && this.x <= borderUISize + this.width) {
        this.x += this.moveSpeed
      }
      */
      this.x += this.moveSpeed;
    }
  }