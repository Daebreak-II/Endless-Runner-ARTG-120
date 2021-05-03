class EnemyCannonBall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeedX = scrollSpeed + 4;
      this.moveSpeedY = 5;
    }


    update() {
        this.moveSpeedY = scrollSpeed;
        // move Canon Ball Down
        this.y += this.moveSpeedY;
        // destroy when off Screen
        if(this.y >= game.config.height + borderUISize + borderPadding) {
            this.destroy;
            pCannonBallRemove = true;
        }
        if(this.x >= game.config.width + this.width) {
            this.destroy;
            pCannonBallRemove = true;
        }
        if(this.x >= 0 - this.width) {
            this.destroy;
            pCannonBallRemove = true;
        }
    }

}