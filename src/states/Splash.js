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
    this.load.spritesheet('player', '/assets/images/player.png', 65, 64)

    // PNJ
    this.load.spritesheet('pnjOne', '/assets/pnj/pnjOne.png', 65, 64)
    this.load.json('speechPnj', '/assets/pnj/pnjOne.json')
  }

  create () {
    this.state.start('Game')
  }
}
