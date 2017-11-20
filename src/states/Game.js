/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.map = this.add.tilemap('MapOneJSON')
    this.map.addTilesetImage('tiles', 'MapOnePNG')

    this.backgroundLayer = this.map.createLayer('BackgroundLayer')
    this.groundLayer = this.map.createLayer('GroundLayer')
    this.map.setCollisionBetween(0, 10000, true, 'GroundLayer')
    this.groundLayer.resizeWorld()

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'player'
    })

    this.game.add.existing(this.player)
  }

  update () {
    this.game.physics.arcade.collide(this.player, this.groundLayer)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
