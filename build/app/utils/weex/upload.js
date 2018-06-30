
const fs = require('fs')
const __request = require('request')
const path = require('path')
const logger = require('../logger')
const shell = require('shelljs')
const zipFolder = require('zip-folder')
const readConfig = require('../readConfig')

var baseUrl = 'https://www.zlgcloud.com/v1' //
const appName = readConfig.get('appName')

function uploadAppZip () {
  if (fs.existsSync(path.resolve(process.cwd(), 'app.zip'))) {
    shell.rm('-rf', 'app.zip')
  }
  return new Promise(function (resolve, reject) {
    shell.mkdir('_app')
    shell.cp('-r', 'app', '_app/app')
    zipFolder(path.resolve(process.cwd(), '_app'), path.resolve(process.cwd(), 'app.zip'), function (err) {
      if (err) {
        logger.fatal('压缩失败: %s', err)
        reject(err)
      } else {
        __request.post(baseUrl + '/auth/login', {
          form: {
            'username': 'webadmin',
            'password': '12345678'
          },
          jar: true // 保存cookies
        }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            var r = __request.post(baseUrl + '/webapp?debug=true', { jar: true },
              function (error, response, body) {
                if (!error && response.statusCode === 200) {
                  logger.sep()
                  logger.success('app.zip 上传成功！')
                  var now = new Date()
                  var filename = formatTime(now, 'yyyy_MM_dd_hh_mm_ss_SSS.zip')
                  shell.cp('app.zip', 'JSBundles/UpdateRecord/' + filename)
                  shell.rm('-rf', 'app.zip')
                  shell.rm('-rf', '_app')
                  shell.rm('-rf', `app/${appName}/jsVersion`)
                  shell.rm('-rf', `app/${appName}/android/*`)
                  resolve()
                } else {
                  logger.fatal('app.zip 上传失败: ' + error)
                  reject(error)
                }
              })
            var form = r.form()
            form.append('file', fs.createReadStream(path.resolve(process.cwd(), 'app.zip')), {
              filename: 'app.zip',
              contentType: 'application/zip'
            })
          } else {
            logger.fatal(error)
            reject(error)
          }
        })
      }
    })
  })
}

function formatTime (d1, format) {
  if (d1 instanceof Date) {
    var date = {
      'M+': d1.getMonth() + 1,
      'd+': d1.getDate(),
      'h+': d1.getHours(),
      'm+': d1.getMinutes(),
      's+': d1.getSeconds(),
      'q+': Math.floor((d1.getMonth() + 3) / 3),
      'S+': d1.getMilliseconds()
    }
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (d1.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('00' + date[k]).length - RegExp.$1.length))
      }
    }
    return format
  }
}

module.exports = {
  uploadAppZip: uploadAppZip
}
