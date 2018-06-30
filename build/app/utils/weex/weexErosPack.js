var fs = require('fs')
var path = require('path')
var jsonfile = require('jsonfile')
var shell = require('shelljs')
var readConfig = require('../readConfig')
var logger = require('../logger')

function _writeJsonToIos (name, data) {
  const iosZipTarget = path.resolve(process.cwd(), './platforms/' + readConfig.get('localZipFolder').iOS)
  // jsonfile.writeFileSync(path.resolve(iosZipTarget, 'eros.native.json'), data);
  jsonfile.writeFileSync(path.resolve(iosZipTarget, name), data)
}
function _writeJsonToAndroid (name, data) {
  const androidZipTarget = path.resolve(process.cwd(), './platforms/' + readConfig.get('localZipFolder').android)
  // jsonfile.writeFileSync(path.resolve(androidZipTarget, 'eros.native.json'), data);
  jsonfile.writeFileSync(path.resolve(androidZipTarget, name), data)
}

function iosHandler (params) {
  var iosZipTarget = path.resolve(process.cwd(), './platforms/' + readConfig.get('localZipFolder').iOS)

  logger.sep()
  logger.success('compile done! start to pack.'.green)

  logger.log('copy  -----> bundle.zip')
  shell.cp('-r', params.jsZipPath, iosZipTarget + '/bundle.zip')

  // logger.log('write -----> eros.native.json');
  // _writeJsonToIos('eros.native.json', params.erosNative);

  logger.log('write -----> bundle.config')
  _writeJsonToIos('bundle.config', params.bundleConfig)

  logger.sep()
  logger.success('packing success!'.green)
  logger.log('ios bundle zip has packing to: ' + iosZipTarget)
}

function androidHandler (params) {
  var androidZipTarget = path.resolve(process.cwd(), './platforms/' + readConfig.get('localZipFolder').android)
  var gradlePropertiesPath = path.resolve(process.cwd(), './platforms/android/WeexFrameworkWrapper/gradle.properties')
  var erosNativeJs = readConfig.get('erosNativeJs')

  logger.sep()
  logger.success('compile done! start to pack.'.green)
  logger.log('write -----> gradle.properties')

  var content = fs.readFileSync(gradlePropertiesPath, 'utf8')
  var prefix = '#start'
  var preIndex = content.lastIndexOf(prefix)

  let info = `
#start
UMENG_APPKEY=${erosNativeJs.umeng.androidAppKey}
GETUI_APPID=${erosNativeJs.getui.appId}
GETUI_APPKEY=${erosNativeJs.getui.appKey}
GETTUI_APPSECRET=${erosNativeJs.getui.appSecret}
#end
`
  fs.writeFileSync(gradlePropertiesPath, content.slice(0, preIndex).concat(info), 'utf8')

  logger.log('copy  -----> bundle.zip')
  shell.cp('-r', params.jsZipPath, androidZipTarget + '/bundle.zip')

  // _packJsonToAndroid('eros.native.json', params.erosNative);
  // _writeJsonToAndroid(params.erosNative)

  logger.log('write -----> bundle.config')
  _writeJsonToAndroid('bundle.config', params.bundleConfig)

  logger.sep()
  logger.success('packing success!'.green)
  logger.log('android bundle zip has packing to: ' + androidZipTarget)
}

module.exports = {
  _writeJsonToIos: _writeJsonToIos,
  _writeJsonToAndroid: _writeJsonToAndroid,
  packIosHandler: iosHandler,
  packAndroidHandler: androidHandler
}
