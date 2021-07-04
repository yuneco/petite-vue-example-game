import { createApp } from 'https://unpkg.com/petite-vue?module'
import { store } from './store.js'
import { Chara } from './Chara.js'
import { Cactus } from './Cactus.js'
import { shouldAddCactus } from './gameLogics.js'
import { Ticker } from './Ticker.js'

const FPS = 60
let gameTicker

const app = createApp({
  store,
  Chara,
  Cactus,

  onTick(delta) {
    if (!this.store.game.isPlaying) return
    const frame = delta / (1000 / FPS)
    this.store.updateCharaMove(frame)
    this.store.updateCactusMove(frame)
    if (shouldAddCactus()) {
      this.store.addCactus()
    }
    this.store.updateHitStatus()
  },

  onMounted() {
    gameTicker = new Ticker((delta) => this.onTick(delta))
    gameTicker.start()
  },
})

app.mount()
