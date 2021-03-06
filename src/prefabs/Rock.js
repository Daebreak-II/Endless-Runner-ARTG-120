class Rock extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeed = scrollSpeed;
    }

    update() {
        this.moveSpeed = scrollSpeed;
        // move rock down
        this.y += this.moveSpeed;
        // return to top when out of screen
        if(this.y >= game.config.height + borderUISize + borderPadding) {
            this.respawn();
        }
    }

    respawn() {
        this.y = Phaser.Math.Between(0 - this.height, 0 - game.config.height);
        this.x = Phaser.Math.Between(borderUISize + borderPadding, game.config.width - borderUISize - borderPadding);
    }
}