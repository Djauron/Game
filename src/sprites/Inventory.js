import Phaser from 'phaser'
export default class extends Phaser.Sprite {
  constructor ({game, player}) {
    super(game)
    this.inventory()
    this.stuff = player.stuff
    this.player = player
    this.lifePotion = this.game.add.audio('lifePotion')
  }

  inventory () {
    this.game.input.keyboard.onPressCallback = (e) => {
      if (e === 'i') {
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
        this.potion.inputEnabled = true
        this.potion.events.onInputDown.add(this.effectPotion, this)
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

  effectPotion () {
    if (this.stuff.potion && this.stuff.potion > 0 && this.player.life < 3) {
      this.closeInventory()
      this.player.life++
      this.stuff.potion--
      this.player.lifePoint()
      this.potionDescribe = this.game.add.text(this.game.camera.width / 2, this.game.camera.width / 2, 'You use 1 potion for get 1 LP', { font: '30px Arial', fill: '#fff' })
      this.potionDescribe.anchor.setTo(0.5, 0.5)
      this.potionDescribe.setTextBounds(0, 100, 800, 100)
      this.potionDescribe.fixedToCamera = true
      this.lifePotion.play()
      setTimeout(() => {
        this.potionDescribe.destroy()
      }, 1500)
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
