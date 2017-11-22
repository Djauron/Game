import Phaser from 'phaser'
export default class {
  constructor (item) {
    this.item = item
    item.body.onCollide = new Phaser.Signal()
    item.body.onCollide.add(this.deleteItem, item)
  }

  deleteItem (item, player) {
    if (player.key === 'player') {
      if (item.key === 'potion') {
        player.stuff.potion++
      }
      if (item.key === 'gold') {
        player.stuff.gold++
      }
      item.kill()
    }
  }
}
