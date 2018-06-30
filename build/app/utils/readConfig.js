/**
 * @Author: yangguangqishimi
 * @Date:   2018-06-28
 * @Email:  1239019842@qq.com
 * @Last modified by:   yangguangqishimi
 * @Last modified time: 2018-06-28
 */

var fs = require('fs')
var _ = require('lodash')
var path = require('path')

var CONFIG = null

function readAllConfig () {
  var devConfigPath = path.join(process.cwd(), './config/app/app.dev.js')
  var nativeConfigPath = path.resolve(process.cwd(), './config/app/app.native.js')

  // 兼容weex-eros
  if (fs.existsSync(nativeConfigPath) && fs.existsSync(devConfigPath)) {
    var devConfig = require(devConfigPath)
    var nativeConfig = require(nativeConfigPath)

    CONFIG = _.assign({
      weex: true,
      appName: nativeConfig.appName,
      hotRefresh: nativeConfig.hotRefresh,
      appBoard: nativeConfig.appBoard,
      localZipFolder: nativeConfig.zipFolder,
      version: nativeConfig.version,
      framework: '// { "framework": "Vue" }\n',
      erosNativeJs: nativeConfig
    }, devConfig)
  }
}

function readNativeConfig () {
  return require(path.resolve(process.cwd(), './config/app/app.native.js'))
}

function get (key) {
  if (CONFIG && CONFIG[key]) {
    return _.cloneDeep(CONFIG[key])
  } else {
    return false
  }
}

function getAllConfig () {
  return CONFIG || false
}
readAllConfig()

module.exports = {
  get: get,
  readNativeConfig: readNativeConfig,
  getAllConfig: getAllConfig
}
