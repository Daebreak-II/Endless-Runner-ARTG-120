class EnemyShip extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.moveSpeedY = scrollSpeed;
      this.moveSpeedX = 2.5;
    }


    update() {
        this.moveSpeedY = scrollSpeed;
        this.y += this.moveSpeedY;
        this.x += this.moveSpeedX;

        // return to top when out of screen
        if(this.y >= game.config.height + this.height) {
            this.respawn();
        }

        // change direction after reaching edge of the screen
        if(this.x > game.config.width + this.width * 0.15) {
            this.moveSpeedX *= -1;
            this.setAngle(-90);
        }    

        if(this.x < 0 - this.width * 0.15) {
            this.moveSpeedX *= -1;
            this.setAngle(90);
        }    
    }

    respawn() {
        this.y = 0 - game.config.height * 2;
    }

    fireCanon() {

    }

}