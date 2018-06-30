/**
 * @Author: yangguangqishimi
 * @Date:   2018-06-28
 * @Email:  1239019842@qq.com
 * @Last modified by:   yangguangqishimi
 * @Last modified time: 2018-06-28
 */

var fs = require('fs')
var path = require('path')
var http = require('http')
var https = require('https')
var connect = require('connect')
var argv = require('yargs').argv
var serveIndex = require('serve-index')
// var print = require('./utils/print')
var logger = require('./utils/logger')
var serveStatic = require('serve-static')
var readConfig = require('./utils/readConfig')

var gulpServer = require('./server/gulpfile')
var proxyMiddleware = require('./middleware/proxy')
var prdToTestMiddleware = require('./middleware/prdToTest')
var corsMiddleware = require('./middleware/cors')

var httpsServerInstance = null
var httpServerInstance = null

function listenPort (server, port) {
  server.on('error', function (e) {
    if (e.code === 'EADDRINUSE') {
      logger.fatal('[ERROR]: Port ' + port + ' already occupied, please close the program that occupies the port or use other ports.')
    }
    if (e.code === 'EACCES') {
      logger.fatal('[ERROR]: Insufficient permissions, please use sudo to execute.')
    }
    return process.exit(1)
  })
  server.on('listening', function (e) {
    gulpServer.start('dev')
  })
  return server.listen(port)
}

function run () {
  var serverConfig = readConfig.get('server') || {}
  var ssl = argv.s || argv.ssl
  var app = connect()
  app.use(corsMiddleware)
    .use(prdToTestMiddleware())
    .use(proxyMiddleware())
    .use(serveStatic(path.join(process.cwd(), serverConfig.path || '../')))
    .use(serveIndex(path.join(process.cwd(), serverConfig.path || '../')))
  if (ssl) {
    var opts = {
      key: fs.readFileSync(path.resolve(process.cwd(), ssl + '.key')),
      cert: fs.readFileSync(path.resolve(process.cwd(), ssl + '.crt'))
    }
    if (httpsServerInstance) {
      httpsServerInstance.close()
      httpsServerInstance = null
    }
    httpsServerInstance = https.createServer(opts, app)
    listenPort(httpsServerInstance, serverConfig.port || 443)
  } else {
    if (httpServerInstance) {
      httpServerInstance.close()
      httpServerInstance = null
    }
    httpServerInstance = http.createServer(app)
    listenPort(httpServerInstance, serverConfig.port || 80)
  }
}

run()
