/**
 * @Author: songqi
 * @Date:   2017-03-09
 * @Last modified by:   songqi
 * @Last modified time: 2017-03-09
 */
var fs = require('fs')
var path = require('path')
var crypto = require('crypto')
var print = require('../print')
var Process = require('child_process')
var readConfig = require('../readConfig')
var shell = require('shelljs')
// var upload = require('./upload')

var appName = readConfig.get('appName')
var diffpwd = readConfig.get('diff')['pwd']
var version = readConfig.get('version')
var versionCode = readConfig.get('erosNativeJs')['versionCode']
var bundleUpdate = readConfig.get('erosNativeJs')['url']['bundleUpdate']

function makeDiff (jsVersion, newZipFolder) {
  updateVersionJson(jsVersion)
  var files = fs.readdirSync(newZipFolder)
  var newZip = path.resolve(process.cwd(), 'dist/js/' + jsVersion + '.zip')
  var promiseAll = files.map(function (item) {
    if (item.indexOf('.zip') !== -1 && item !== jsVersion + '.zip') {
      var md5 = item.slice(0, -4)
      var oldZip = path.resolve(newZipFolder, md5 + '.zip')
      var diffZipMd5 = crypto.createHash('md5').update(md5 + jsVersion, 'utf8').digest('hex')
      // diffZip = path.resolve(process.cwd(), 'dist/js/' + diffZipMd5 + '.zip');
      var diffZip = path.resolve(process.cwd(), `app/${appName}/jsVersion/${diffZipMd5}.zip`)
      // 如果diff md5的值一样 证明2个包没有变化 这时候bsdiff出来的差分包就会有问题 直接return
      var noNeedPatch = (+md5 === +diffZipMd5)
      if (noNeedPatch) return

      return new Promise(function (resolve, reject) {
        Process.exec('bsdiff ' + oldZip + ' ' + newZip + ' ' + diffZip, function (error, stdout, stderr) {
          if (error !== null) {
            print.info('exec error: ' + error)
            return
          }
          resolve()
        })
      })
    }
  })

  Promise.all(promiseAll).then(function () {
    // var timer = setInterval(() => {
    //     process.stdout.write('.');
    // },500)
    // upload.uploadAppZip().then(() => {
    //     clearInterval(timer)
    process.send({
      type: 'done'
    })
    // })
  })
}

process.on('message', function (message) {
  var jsVersion = message.jsVersion
  var filePath = path.resolve(process.cwd(), diffpwd, appName)
  fs.stat(filePath, function (err, data) {
    if (err) {
      fs.mkdirSync(filePath)
      makeDiff(jsVersion, filePath)
    } else {
      makeDiff(jsVersion, filePath)
    }
  })
})

function updateVersionJson (jsVersion) {
  var versionJson
  if (fs.existsSync(path.resolve(process.cwd(), `app/${appName}/version.json`))) {
    versionJson = fs.readFileSync(path.resolve(process.cwd(), `app/${appName}/version.json`), 'utf8')
    versionJson = JSON.parse(versionJson)
  } else {
    versionJson = { android: [], iOS: [] }
  }

  var platform = ['android', 'iOS']
  platform.forEach(function (element) {
    var found = false
    versionJson[element] = versionJson[element].map((item) => {
      if (item.version === version[element] && item.versionCode === versionCode[element]) {
        item.jsVersion = jsVersion
        item.time = Date.now()
        item.path = bundleUpdate
        found = true
      }
      return item
    })
    if (!found) {
      versionJson[element].push({
        version: version[element],
        versionCode: versionCode[element],
        jsVersion: jsVersion,
        path: bundleUpdate,
        time: Date.now()
      })
    }
  }, this)
  if (!fs.existsSync(path.resolve(process.cwd(), `app/${appName}`))) {
    shell.mkdir('-p', path.resolve(process.cwd(), `app/${appName}`))
  }
  fs.writeFileSync(path.resolve(process.cwd(), `app/${appName}/version.json`), JSON.stringify(versionJson))
  if (!fs.existsSync(path.resolve(process.cwd(), `app/${appName}/jsVersion`))) {
    shell.mkdir('-p', path.resolve(process.cwd(), `app/${appName}/jsVersion`))
  }
  shell.cp(`dist/js/${jsVersion}.zip`, `app/${appName}/jsVersion/${jsVersion}.zip`)
}
