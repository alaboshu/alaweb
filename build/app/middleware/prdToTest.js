/**
 * @Author: songqi
 * @Date:   2016-07-15
 * @Email:  songqi@benmu-health.com
 * @Last modified by:   songqi
 * @Last modified time: 2016-09-18
 */

var __request = require('request')

function isSource (url) {
  if ((url.indexOf('_') !== -1 && url.indexOf('.css') !== -1) ||
    (url.indexOf('_') !== -1 && url.indexOf('.js') !== -1)) {
    var tagA = url.lastIndexOf('_')
    var tagB = url.lastIndexOf('.')
    var options = url.slice(0, tagA) + url.slice(tagB)
    return options
  }
  return false
}

// function isDev (url) {
//   var files = url.split('/')[1]
//   var processFiles = process.cwd().split('/')
//   processFiles = processFiles[processFiles.length - 1]
//   if (processFiles === files) {
//     return false
//   }
//   return true
// }

function prdToTest () {
  return function (request, response, next) {
    var url
    var options = isSource(request.url)
    if (options) {
      url = request.headers.host + options
      if (request.client.ssl) {
        url = 'https://' + url
      } else {
        url = 'http://' + url
      }
      __request({
        url: url,
        headers: request.headers
      }).pipe(response)
    } else {
      next()
    }
  }
}

module.exports = prdToTest
