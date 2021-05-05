class Treasure extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.moveSpeed = scrollSpeed;
    }


    update() {
        this.moveSpeed = scrollSpeed;
        // move treasure down
        this.y += this.moveSpeed - 1;
        // return to top when out of screen
        if(this.y >= game.config.height + borderUISize + borderPadding) {
            this.respawn();
        }
    }

    respawn() {
        this.y = Phaser.Math.Between(0 - game.config.height/2, 0 - this.height - game.config.height * 1.5);
        this.x = Phaser.Math.Between(this.width * 0.3, game.config.width - this.width * 0.3);
        if (scoreMultiplier > 1) {
            scoreMultiplier -= 0.5;
        }
    }
}