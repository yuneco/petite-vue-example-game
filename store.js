import { reactive } from 'https://unpkg.com/petite-vue?module'
import {
  CACTUS_SIZE,
  MAX_LIFE,
  CHARA_JUMP_POWER,
  CHARA_JUMP_POWER_MAX,
  CACTUS_SPEED,
  GRAVITY,
  CHARA_DAMAGED_TIME,
} from './gameConsts.js'
import { getHitCactuses } from './gameLogics.js'

export const store = reactive({
  // store state
  game: {
    width: 400,
    score: 0,
    isPlaying: false,
    life: 0,
  },
  cactuses: [],
  chara: {
    x: 20,
    y: 0,
    vy: 0,
    jumpCount: 0,
    damaged: false,
  },

  /** Start new game */
  startGame() {
    this.game.isPlaying = true
    this.game.life = MAX_LIFE
    this.game.score = 0
    this.cactuses = []
  },

  /** End current game */
  gameOver() {
    this.game.isPlaying = false
  },

  /**
   * move charactor.
   * @param {Number} frame
   */
  updateCharaMove(frame = 1) {
    const chara = this.chara
    // move
    chara.y += chara.vy
    chara.vy -= GRAVITY * frame
    // landing
    if (chara.y <= 0) {
      chara.y = 0
      chara.vy = 0
      chara.jumpCount = 0 // reset jump count
    }
  },

  /** Jump charactor */
  jump() {
    const chara = this.chara
    const power = CHARA_JUMP_POWER[chara.jumpCount]
    if (!power) return
    chara.jumpCount++
    chara.vy = Math.min(chara.vy + power, CHARA_JUMP_POWER_MAX)
  },

  /** Add new cactus(random height) */
  addCactus() {
    this.cactuses.push({
      id: `cactus-${Math.random()}`,
      x: this.game.width,
      h:
        CACTUS_SIZE.MIN_H +
        Math.random() * (CACTUS_SIZE.MAX_H - CACTUS_SIZE.MIN_H),
    })
  },

  /**
   * Move all cactuses.
   * @param {Number} frame
   */
  updateCactusMove(frame = 1) {
    const passedCactuses = []
    this.cactuses.forEach((cactus) => {
      cactus.x -= CACTUS_SPEED * frame
      if (cactus.x < -CACTUS_SIZE.W) {
        passedCactuses.push(cactus)
        this.game.score += Math.ceil(cactus.h)
      }
    })
    this.cactuses = this.cactuses.filter(
      (cactus) => !passedCactuses.includes(cactus)
    )
  },

  /**
   * Exec hit test.
   * Decrease life count if the chara hit with a cactus.
   * Dispatch GameOver if no life left after hit.
   */
  updateHitStatus() {
    if (this.chara.damaged) return // ignore second hit while damaged mode.
    const hitCactuses = getHitCactuses(this.chara, this.cactuses)
    if (!hitCactuses.length) return
    this.cactuses = this.cactuses.filter(
      (cactus) => !hitCactuses.includes(cactus)
    )
    this.game.life -= 1
    this.chara.damaged = true
    if (this.game.life <= 0) {
      this.gameOver()
    }
    window.setTimeout(() => {
      this.chara.damaged = false
    }, CHARA_DAMAGED_TIME)
  },
})
