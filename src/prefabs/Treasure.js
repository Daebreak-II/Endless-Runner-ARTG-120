class Treasure extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeed = scrollSpeed;
    }


    update() {
        // move treasure down
        this.y += this.moveSpeed - 1;
        // return to top when out of screen
        if(this.y >= game.config.height + borderUISize + borderPadding) {
            this.y = 0 - this.width;
        }

    }
}