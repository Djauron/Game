import Phaser from 'phaser'
import Player from '../sprites/Player'
import Pnj from '../sprites/Pnj'
import Potion from '../sprites/Potion'
import Gold from '../sprites/Gold'
import Box from '../sprites/Box'
import Vendor from '../sprites/Vendor'

export default class extends Phaser.State {
  init () {}
  preload () {
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.items = []
    this.box = []

    this.map = this.add.tilemap('MapOneJSON')
    this.map.addTilesetImage('tiles', 'MapOnePNG')
    this.map.addTilesetImage('tiles1', 'MapTwoPNG')
    this.map.addTilesetImage('tiles2', 'MapThreePNG')
    this.map.addTilesetImage('tiles4', 'MapFourPNG')

    this.sol = this.map.createLayer('Sol')
    this.switch = this.map.createLayer('Switch')
    this.mur = this.map.createLayer('Mur')
    this.murTwo = this.map.createLayer('Mur2')
    this.solEau = this.map.createLayer('SolEau')
    this.map.setCollisionBetween(0, 10000, true, 'Mur')
    this.map.setCollisionBetween(0, 10000, true, 'Mur2')
    this.music = this.game.add.audio('MusicMapOne')
    this.sol.resizeWorld()
    this.createItems()

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

    this.vendor = new Vendor({
      game: this.game,
      x: 1918.0,
      y: 1681.0,
      asset: 'pnjElf',
      pnjId: 'Elf',
      player: this.player
    })

    this.game.add.existing(this.player)
    this.game.add.existing(this.pnj)
    this.game.add.existing(this.vendor)
    this.music.play()
    this.music.loopFull()
  }

  update () {
    this.game.physics.arcade.collide(this.player, this.vendor)
    this.game.physics.arcade.collide(this.pnj, this.vendor)
    this.game.physics.arcade.collide(this.player, this.mur)
    this.game.physics.arcade.collide(this.player, this.murTwo)
    this.game.physics.arcade.collide(this.player, this.pnj)
    this.game.physics.arcade.collide(this.pnj, this.mur)
    this.game.physics.arcade.collide(this.pnj, this.murTwo)
    this.items.map(item => {
      this.game.physics.arcade.collide(this.player, item)
    })
    this.box.map(b => {
      this.game.physics.arcade.collide(this.player, b)
      this.game.physics.arcade.collide(b, this.mur)
      this.game.physics.arcade.collide(b, this.murTwo)
      this.game.physics.arcade.collide(this.player, b)
    })
  }

  createItems () {
    // creation d'items
    if (this.map.objects['item']) {
      const objects = this.map.objects['item']
      objects.forEach(object => {
        if (object.type === 'potion') {
          this.items.push(new Potion({
            game: this.game,
            x: object.x,
            y: object.y,
            asset: 'potion'
          }))
        } else if (object.type === 'gold') {
          this.items.push(new Gold({
            game: this.game,
            x: object.x,
            y: object.y,
            asset: 'gold'
          }))
        } else if (object.type === 'box') {
          this.box.push(new Box({
            game: this.game,
            x: object.x,
            y: object.y,
            asset: 'box'
          }))
        }
      })
    }
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
      this.game.debug.body(this.player)
      this.game.debug.body(this.pnj)
      this.game.debug.body(this.vendor)
    }
  }
}
