class PlayerCannonBall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.velocity = shipVelocity / 100;
      this.moveSpeedX = this.velocity * 1.5;
      this.moveSpeedY = -(5 * 1.5);
    }


    update() {
        // move Cannon Ball Down
        this.y += this.moveSpeedY;
        this.x += this.moveSpeedX;

        if(this.y <= 0 - this.height) {
            this.destroy();
        }
        if(this.x <= 0 - this.width) {
            this.destroy();
        }
        if(this.x >= game.config.width + this.width) {
            this.destroy();
        }
    }
}