class EnemyShip extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeedY = scrollSpeed;
      this.moveSpeedX = 5;
    }


    update() {
        this.moveSpeedY = scrollSpeed;
        // move rock down
        this.y += this.moveSpeed;
        // return to top when out of screen
        if(this.y >= game.config.height + borderUISize + borderPadding) {
            this.respawn();
        }

        // loop after crossing edge of screen
        if(this.x >= game.config.width * 1.5 + this.width) {
            this.x = 0 - game.config.width / 2 + this.width;
        }
    }

    respawn() {
        this.y = 0 - game.config.height() * 2;
    }

    fireCanon() {

    }

}