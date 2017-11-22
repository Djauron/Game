import Phaser from 'phaser'
export default class extends Phaser.Sprite {
  constructor ({game, stuff}) {
    super(game)
    this.inventory()
    this.stuff = stuff
  }

  inventory () {
    this.game.input.keyboard.onDownCallback = (e) => {
      if (e.keyCode === 73) {
        if (this.game.paused === false) {
          this.openInventory()
        } else {
          this.closeInventory()
        }
      }
    }
  }

  openInventory () {
    if (this.game.paused === false) {
      this.game.paused = true
      this.bg = this.game.add.sprite(this.game.camera.x, this.game.camera.y, 'inventory')
      this.bg.scale.setTo(0.5)
      this.posItem = {
        x: this.game.camera.x + 50,
        y: this.game.camera.y + 100
      }
      this.posTxt = {
        x: this.game.camera.x + 125,
        y: this.game.camera.y + 20
      }

      if (this.stuff.potion > 0 && this.stuff.potion) {
        this.potion = this.game.add.sprite(this.posItem.x, this.posItem.y, 'potion')
        this.potion.scale.setTo(0.2)
        this.nbPotion = this.game.add.text(this.posTxt.x, this.posTxt.y, 'X' + this.stuff.potion, { font: '26px Arial' })
        this.nbPotion.anchor.setTo(0.5, 0.5)
        this.nbPotion.setTextBounds(0, 100, 800, 100)
        this.posItem.y += 50
        this.posTxt.y += 55
      }
      if (this.stuff.gold > 0 && this.stuff.gold) {
        this.coin = this.game.add.sprite(this.posItem.x, this.posItem.y, 'gold')
        this.coin.scale.setTo(0.15)
        this.nbCoin = this.game.add.text(this.posTxt.x, this.posTxt.y, 'X' + this.stuff.gold, { font: '26px Arial' })
        this.nbCoin.anchor.setTo(0.5, 0.5)
        this.nbCoin.setTextBounds(0, 100, 800, 100)
        this.posItem.y += 50
        this.posTxt.y += 55
      }
    }
  }

  closeInventory () {
    this.game.paused = false
    this.bg.destroy()
    if (this.stuff.potion && this.stuff.potion > 0) {
      this.potion.destroy()
      this.nbPotion.destroy()
    }
    if (this.stuff.gold && this.stuff.gold > 0) {
      this.coin.destroy()
      this.nbCoin.destroy()
    }
  }
}
