var fs = require('fs')
var path = require('path')
var logger = require('../utils/logger')

const LOG_POSITION = path.resolve(process.cwd(), 'ip.txt')
function getIPAddress () {
  var interfaces = require('os').networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

function isIPChanged (ip) {
  if (!fsExistsSync(LOG_POSITION)) {
    iPRecord('127.0.0.1')
    return
  }
  const recordIp = fs.readFileSync(LOG_POSITION)
  return recordIp !== ip
}

function iPRecord (ip) {
  fs.writeFile(LOG_POSITION, ip, function (err) {
    if (err) {
      return logger.fatal(err)
    }
  })
}

function fsExistsSync (path) {
  try {
    fs.accessSync(path, fs.F_OK)
  } catch (e) {
    return false
  }
  return true
}
module.exports = {
  iPRecord: iPRecord,
  getIPAddress: getIPAddress,
  isIPChanged: isIPChanged
}
