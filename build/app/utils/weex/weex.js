/**
 * @Author: songqi
 * @Date:   2017-03-06
 * @Last modified by:   songqi
 * @Last modified time: 2017-04-06
 */

var fs = require('fs')
var _ = require('lodash')
var path = require('path')
var crypto = require('crypto')
var through = require('through2')
var __request = require('request')
var jsonfile = require('jsonfile')
var zipFolder = require('zip-folder')
var Process = require('child_process')
var logger = require('../logger')
var argv = require('yargs').argv
var exists = require('fs').existsSync
var weexErosPack = require('./weexErosPack')
var gutil = require('gulp-util')
var readConfig = require('../readConfig')
var shell = require('shelljs')

var versionMap = []
var pagesTag = path.sep + 'dist' + path.sep + 'js'
var iconfontTag = path.sep + 'iconfont' + path.sep
var assetsTag = path.sep + 'assets' + path.sep
var appName = readConfig.get('appName')
var versionInfo = readConfig.get('version')
var diffpwd = readConfig.get('diff')['pwd']

function getIconfontMd5 () {
  return through.obj(function (file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'))
      return cb()
    }

    if (!file.contents) {
      return cb()
    }
    var filePath = file.history[0]
    var indexTag = filePath.indexOf(iconfontTag)
    var content = file.contents.toString('utf8')
    versionMap.push({
      page: filePath.slice(indexTag).split(path.sep).join('/'),
      md5: crypto.createHash('md5').update(content, 'utf8').digest('hex')
    })

    cb(null, file)
  }, function (cb) {
    cb()
  })
}

function getAssetsMd5 () {
  return through.obj(function (file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'))
      return cb()
    }

    if (!file.contents) {
      return cb()
    }
    var filePath = file.history[0]
    var indexTag = filePath.indexOf(assetsTag)
    var content = file.contents.toString('utf8')
    versionMap.push({
      page: filePath.slice(indexTag).split(path.sep).join('/'),
      md5: crypto.createHash('md5').update(content, 'utf8').digest('hex')
    })

    cb(null, file)
  }, function (cb) {
    cb()
  })
}

function addFramework (framework) {
  return through.obj(function (file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'))
      return cb()
    }

    if (!file.contents) {
      return cb()
    }

    var filePath = file.history[0]
    var indexTag = filePath.indexOf(pagesTag) + pagesTag.length
    var content = file.contents.toString('utf8')
    var text = (content.indexOf(framework) > -1 ? '' : framework) + content

    file.contents = Buffer.from(text)
    versionMap.push({
      page: filePath.slice(indexTag).split(path.sep).join('/'),
      md5: crypto.createHash('md5').update(text, 'utf8').digest('hex')
    })
    cb(null, file)
  }, function (cb) {
    cb()
  })
}

function addAppBoardWhenDev (appBoardPath) {
  return through.obj(function (file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'))
      return cb()
    }

    if (!file.contents) {
      return cb()
    }

    const filePath = file.history[0]
    const indexTag = filePath.indexOf(pagesTag) + pagesTag.length
    const content = file.contents.toString('utf8')
    const appBoardContent = fs.readFileSync(appBoardPath, 'utf8')
    const text = appBoardContent + content

    file.contents = Buffer.from(text)
    versionMap.push({
      page: filePath.slice(indexTag).split(path.sep).join('/'),
      md5: crypto.createHash('md5').update(text, 'utf8').digest('hex')
    })
    cb(null, file)
  }, function (cb) {
    cb()
  })
}

function getMd5Version () {
  var md5Arr = []
  versionMap.map(function (item) {
    md5Arr.push(item.md5)
  })
  md5Arr.sort()
  return crypto.createHash('md5').update(md5Arr.join(''), 'utf8').digest('hex')
}

function makeDiffZip ({ jsVersion, platform }) {
  return new Promise((resolve) => {
    var zipFolder = readConfig.get('diff').pwd

    if (argv.d || argv.diff || argv.s || argv.send) {
      var targetPath = path.resolve(zipFolder, appName)
      var n = Process.fork(path.resolve(__dirname, './diffFile.js'))

      if (!exists(targetPath)) {
        shell.mkdir('-p', targetPath)
      }
      n.on('message', function (message) {
        if (message.type === 'done') {
          n.kill()
          shell.cp('dist/js/' + jsVersion + '.zip', targetPath)
          logger.success('publish success!')
          logger.sep()
          logger.log('app name: %s', appName)
          logger.log('app zip md5: %s', jsVersion)
          logger.log('zip saved path: %s', targetPath)
          resolve({ jsVersion, platform })
        }
      })
      n.send({
        jsVersion: jsVersion
      })
    } else {
      resolve({ jsVersion, platform })
    }
  })
}

function writeJson ({ jsVersion, platform }) {
  return new Promise((resolve, reject) => {
    var requestUrl = argv.s || argv.send
    var file = path.resolve(process.cwd(), 'dist/version.json')
    var jsPath = process.cwd() + '/dist/js/'
    var tmpJsPath = process.cwd() + '/dist/_js/'

    shell.mkdir('-p', tmpJsPath)
    shell.cp('-r', process.cwd() + '/dist/js/**/*.zip', tmpJsPath)
    shell.rm('-rf', jsPath)
    fs.rename(tmpJsPath, jsPath)
    if (requestUrl) {
      __request.post(requestUrl, {
        form: versionInfo
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          resolve({ jsVersion, platform })
        } else {
          logger.fatal('eros publish fail: %s', error)
          reject(error)
        }
      })
    } else {
      jsonfile.writeFile(file, versionInfo, function (err) {
        if (err) {
          logger.fatal('generate eros json error: %s', err)
          reject(err)
          return
        }
        resolve({ jsVersion, platform })
      })
    }
  })
}

function generateZip ({ jsVersion, platform }) {
  return new Promise((resolve, reject) => {
    zipFolder(path.resolve(process.cwd(), 'dist/js/_pages/'), path.resolve(process.cwd(), 'dist/js/' + jsVersion + '.zip'), (err) => {
      if (err) {
        logger.fatal('generate eros json error: %s', err)
        reject(err)
      } else {
        resolve({ jsVersion, platform })
      }
    })
  })
}

function minWeex (platform) {
  var timestamp = +new Date()
  var jsVersion = getMd5Version()
  var md5File = path.resolve(process.cwd(), 'dist/js/_pages/md5.json')

  versionInfo['appName'] = appName
  versionInfo['jsVersion'] = jsVersion
  versionInfo['timestamp'] = timestamp
  versionInfo['jsPath'] = readConfig.get('diff')['proxy']

  jsonfile.writeFile(md5File, _.assign({
    filesMd5: versionMap
  }, versionInfo), (e) => {
    generateZip({ jsVersion, platform })
      .then(writeJson)
      .then(makeDiffZip)
      .then(weexErosHandler)
      .catch((err) => {
        if (err) {
          try {
            if (err.stderr) {
              console.log(err.stderr)
            } else {
              console.log(err)
            }
            if (err.output) console.log(err.output.join('\n'))
          } catch (e) {
            console.log(e)
          }
        }
      })
  })
}

function weexErosHandler ({ jsVersion, platform }) {
  return new Promise((resolve) => {
    var params = {
      jsZipPath: path.resolve(process.cwd(), './dist/js/' + jsVersion + '.zip'),
      erosNative: require(path.resolve(process.cwd(), './config/app/app.native.js')),
      bundleConfig: _.assign({
        filesMd5: versionMap
      }, versionInfo)
    }
    // params.erosNative = _encrypt(params.erosNative)
    if (platform === 'ALL') {
      weexErosPack.packAndroidHandler(params)
      weexErosPack.packIosHandler(params)
      shell.rm('-rf', path.resolve(diffpwd, `${appName}/*`))
      shell.cp(path.resolve(process.cwd(), './dist/js/' + jsVersion + '.zip'), path.resolve(diffpwd, `${appName}/${jsVersion}.zip`))
    }

    platform === 'IOS' && weexErosPack.packIosHandler(params)
    platform === 'ANDROID' && weexErosPack.packAndroidHandler(params)

    resolve()
  })
}

// 加密
function _encrypt (data) {
  let _crypt = require('cryptlib')
  let tmp = JSON.stringify(data)
  let iv = 'RjatRGC4W72PJXTE'
  let key = _crypt.getHashSha256('eros loves you', 32)

  return _crypt.encrypt(tmp, key, iv)
}

module.exports = {
  _encrypt: _encrypt,
  minWeex: minWeex,
  addFramework: addFramework,
  getAssetsMd5: getAssetsMd5,
  getIconfontMd5: getIconfontMd5,
  addAppBoardWhenDev: addAppBoardWhenDev
}
