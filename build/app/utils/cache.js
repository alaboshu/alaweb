/**
 * Created by godsong on 16/12/21.
 */
const Fs = require('fs')
const Path = require('path')
class CacheManager {
  constructor (defaultCache = {}) {
    this.cache = defaultCache
  }
  init (path) {
    this.path = path || Path.join(process.cwd(), '.weexpack.cache')
    try {
      this.cache = JSON.parse(Fs.readFileSync(this.path).toString())
    } catch (e) {
    }
  }

  get (prop, defaultValue) {
    let props = prop.split('.')
    var p = props.shift()
    var cur = this.cache

    while (p) {
      cur = cur[p]
      if (cur === undefined || cur === null) break
      p = props.shift()
    }
    return cur || defaultValue
  }
  save () {
    Fs.writeFileSync(this.path, JSON.stringify(this.cache, null, 4))
  }
}
module.exports = new CacheManager()
