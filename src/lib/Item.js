import Phaser from 'phaser'
export default class {
  constructor (item, game) {
    this.game = game
    this.item = item
    item.body.onCollide = new Phaser.Signal()
    item.body.onCollide.add(this.deleteItem, item)
  }

  deleteItem (item, player) {
    if (player.key === 'player') {
      if (item.key === 'potion') {
        player.stuff.potion++
        this.musicPotion = this.game.add.audio('collectPotion')
        this.musicPotion.play()
      }
      if (item.key === 'gold') {
        player.stuff.gold++
        this.musicCoin = this.game.add.audio('collectCoin')
        this.musicCoin.play()
      }
      item.kill()
    }
  }
}
