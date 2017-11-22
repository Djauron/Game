/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Pnj from '../sprites/Pnj'

export default class extends Phaser.State {
  init () {}
  preload () {
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.map = this.add.tilemap('MapOneJSON')
    this.map.addTilesetImage('tiles', 'MapOnePNG')
    this.map.addTilesetImage('tiles1', 'MapTwoPNG')
    this.map.addTilesetImage('tiles2', 'MapThreePNG')

    this.sol = this.map.createLayer('Sol')
    this.switch = this.map.createLayer('Switch')
    this.mur = this.map.createLayer('Mur')
    this.murTwo = this.map.createLayer('Mur2')
    this.solEau = this.map.createLayer('SolEau')
    this.map.setCollisionBetween(0, 10000, true, 'Mur')
    this.map.setCollisionBetween(0, 10000, true, 'Mur2')
    this.sol.resizeWorld()

    this.player = new Player({
      game: this.game,
      x: 1958.0,
      y: 1763.0,
      asset: 'player'
    })

    this.pnj = new Pnj({
      game: this.game,
      x: 1828.0,
      y: 1816.0,
      asset: 'pnjOne',
      pnjId: 'Princess'
    })

    this.game.add.existing(this.player)
    this.game.add.existing(this.pnj)
  }

  update () {
    this.game.physics.arcade.collide(this.player, this.mur)
    this.game.physics.arcade.collide(this.player, this.murTwo)
    this.game.physics.arcade.collide(this.player, this.pnj)
    this.game.physics.arcade.collide(this.pnj, this.mur)
    this.game.physics.arcade.collide(this.pnj, this.murTwo)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
      this.game.debug.body(this.player)
      this.game.debug.body(this.pnj)
    }
  }
}
