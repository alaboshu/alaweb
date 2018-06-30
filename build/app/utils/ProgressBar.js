/**
 * Created by godsong on 16/12/9.
 */
const Gauge = require('gauge')
class ProgressBar {
  constructor (duration, title, content, stream = process.stdout) {
    let completed = 0
    let interval = 50
    let factor = 0.2 + Math.random() * 0.7
    this._complete = false
    this.title = title
    this.content = content
    let gauge = new Gauge(stream, {
      updateInterval: 20
    })
    this.progress = setInterval(() => {
      if (this._complete) {
        completed = duration
        if (factor <= 1) {
          factor += 0.1
        } else {
          clearInterval(this.progress)
          gauge.hide()
          this.isOver = true
          this.callback && this.callback()
          return
        }
      }
      if (completed <= duration) {
        gauge.show(this.title, completed / duration * factor)
        if (Math.random() * 10 < 6 && completed < duration) {
          completed += interval
        }
      }

      gauge.pulse(this.content)
    }, interval)
  }
  complete (callback) {
    this._complete = true
    if (this.isOver) {
      callback()
    } else {
      this.callback = callback
    }
  }
}
module.exports = ProgressBar
