/**
 * Utility class of requestAnimationFrame.
 */
export class Ticker{
  /**
   * init with onTick function. 
   * @param {Function} func func(deltaMs){...}  
   */
  constructor(func) {
    this.func = func
    this.lastExec = 0
    this._running = false
  }

  _run() {
    if (!this._running) return
    const now = Date.now()
    this.func(now - this.lastExec)
    this.lastExec = now
    window.requestAnimationFrame(() => this._run())
  }

  /** start requestAnimationFrame loop and exec first call immediately. */
  start() {
    if (this._running) return
    this.lastExec = Date.now()
    this._running = true
    this._run()
  }

  /** stop requestAnimationFrame loop. */
  stop() {
    this._running = false
  }
}
