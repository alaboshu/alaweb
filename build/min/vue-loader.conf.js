const utils = require('./utils')
const config = require('../../config/min')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: config.build.productionSourceMap,
    extract: true
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
