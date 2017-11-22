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

    this.initAnimation()
  }

  update () {
    var randomInt = Math.floor((Math.random() * 1500) + 1)
    if (randomInt > 0 && randomInt < 5) {
      this.movePlayer(randomInt)
    }
  }

  movePlayer (randomInt) {
    if (randomInt === 4) {
      this.body.velocity.y = -100
      this.animations.play('top')
    } else if (randomInt === 3) {
      this.body.velocity.y = 100
      this.animations.play('bottom')
    } else if (randomInt === 2) {
      this.body.velocity.x = 100
      this.animations.play('right')
    } else if (randomInt === 1) {
      this.body.velocity.x = -100
      this.animations.play('left')
    }
    setTimeout(() => {
      this.body.velocity.y = 0
      this.body.velocity.x = 0
      this.animations.stop()
    }, 1000)
  }

  initAnimation () {
    this.animations.add('left', [208, 209, 210, 211, 212, 213, 214, 215], 10, true)
    this.animations.add('right', [254, 255, 256, 257, 258, 259, 260], 10, true)
    this.animations.add('bottom', [232, 233, 234, 235, 236, 237, 238], 10, true)
    this.animations.add('top', [185, 186, 187, 188, 189, 190, 191, 192], 10, true)
  }

  dialog (pnj, player) {
    if (player.key === 'player') {
      if (this.nbCollid % 2 === 0) {
        this.openDialog()
        this.game.input.keyboard.onDownCallback = (e) => {
          if (e.keyCode === 13) {
            if (this.game.paused !== false) {
              this.closeDialog()
            }
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
