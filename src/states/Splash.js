import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.tilemap('MapOneJSON', '/assets/mapOne/mapOne.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('MapOnePNG', '/assets/mapOne/level.png')
    this.load.image('MapTwoPNG', '/assets/mapOne/build_atlas.png')
    this.load.image('MapThreePNG', '/assets/mapOne/objMisc.png')
    this.load.image('potion', 'assets/images/potion.png')
    this.load.image('gold', 'assets/images/gold.png')
    this.load.image('box', 'assets/images/Box.png')
    this.load.spritesheet('player', '/assets/images/player.png', 65, 64)
    this.load.audio('MusicMapOne', '/assets/Music/Desert Theme.mp3')
    this.load.image('inventory', '/assets/images/inventory.png')

    // PNJ
    this.load.spritesheet('pnjOne', '/assets/pnj/pnjOne.png', 65, 64)
    this.load.json('speechPnj', '/assets/pnj/pnjOne.json')
  }

  create () {
    this.state.start('Game')
  }
}
