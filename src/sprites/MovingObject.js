import Phaser from 'phaser'
export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.game = game
    this.anchor.setTo(1.2)
    this.scale.setTo(1.2)
    this.game.physics.arcade.enable(this)

    this.body.collideWorldBounds = true
  }
  update () {

  }
}
