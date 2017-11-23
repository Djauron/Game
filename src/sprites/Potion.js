import Phaser from 'phaser'
import Item from '../lib/Item'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.game = game
    this.scale.setTo(0.2)
    this.game.physics.arcade.enable(this)

    this.item = new Item(this, game)

    this.game.add.existing(this)
  }
}
