export class Ticker{
  constructor(func) {
    this.func = func
    this.lastExec = 0
    this._running = false
  }

  run() {
    if (!this._running) return
    const now = Date.now()
    this.func(now - this.lastExec)
    this.lastExec = now
    window.requestAnimationFrame(() => this.run())
  }

  start() {
    if (this._running) return
    this.lastExec = Date.now()
    this._running = true
    this.run()
  }

  stop() {
    this._running = false
  }
}
