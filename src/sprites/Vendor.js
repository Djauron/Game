import Phaser from 'phaser'
export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, pnjId }) {
    super(game, x, y, asset)
    this.game = game
    this.nbCollid = 2
    this.info = null
    this.anchor.setTo(1)
    this.scale.setTo(1)
    this.game.physics.arcade.enable(this)
    this.body.bounce.y = 0
    this.body.mass = 0
    this.body.gravity.y = 0
    this.body.gravity.x = 0
    this.body.velocity.x = 0
    this.body.collideWorldBounds = true
    this.body.immovable = true
    this.body.setSize(30, 50, 17, 35)
    this.speech = this.game.cache.getJSON('speechPnj')

    Object.keys(this.speech).map((perso) => {
      if (perso === pnjId) {
        this.info = this.speech[perso]
      }
    })

    this.body.onCollide = new Phaser.Signal()
    this.body.onCollide.add(this.dialog, this)
  }

  update () {

  }

  dialog (pnj, player) {
    if (player.key === 'player') {
      if (this.nbCollid % 2 === 0) {
        this.openDialog()
        this.game.input.keyboard.onDownCallback = (e) => {
          if (e.keyCode === 13 && this.game.paused) {
            this.closeDialog()
          }
        }
      }
      this.nbCollid++
    }
  }

  openDialog () {
    if (this.game.paused === false) {
      this.game.paused = true
      this.choiseLabel = this.game.add.text(this.game.camera.x + (this.game.width / 2), this.game.camera.y + (this.game.width / 2), this.info.text, { font: '30px Arial', fill: '#fff' })
      this.choiseLabel.anchor.setTo(0.5, 0.5)
      this.choiseLabel.setTextBounds(0, 100, 800, 100)
    }
  }

  closeDialog () {
    this.game.paused = false
    this.choiseLabel.destroy()
  }
}
