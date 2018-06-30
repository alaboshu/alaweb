// const os = require('os')
// const _ = require('lodash')
const path = require('path')
const gulp = require('gulp')
// const sass = require('gulp-sass')
// const less = require('gulp-less')
const argv = require('yargs').argv
const clean = require('gulp-clean')
const shell = require('shelljs')
// const webpack = require('webpack')
const merge = require('merge-stream')
const gulpSequence = require('gulp-sequence')
const serverUtil = require('./util')

const weexUtil = require('../utils/weex/weex')
const weexErosPackUtil = require('../utils/weex/weexErosPack')
const getFiles = require('../utils/getFiles')
// const getEntry = require('../utils/getWebpackFiles')

const readConfig = require('../utils/readConfig')
const logger = require('../utils/logger')

const webpackInstance = require('./webpack.config.new.js')

let weexErosPlatform = ''
// let wsInstance = null
// iconfont
gulp.task('build-iconfont', done => {
  gulp.src('src/iconfont/**/*')
    .pipe(logger.time('build-iconfont'))
    .pipe(gulp.dest('dist/iconfont', {
      mode: '0777'
    }))
    .on('end', () => {
      done && done()
    })
})

// assets
gulp.task('build-assets', done => {
  gulp.src('src/assets/**/*')
    .pipe(logger.time('build-assets'))
    .pipe(gulp.dest('dist/assets', {
      mode: '0777'
    }))
    .on('end', () => {
      done && done()
    })
})

gulp.task('weex-aros-ios', (done) => {
  weexErosPlatform = 'IOS'
  done()
})

gulp.task('weex-aros-android', (done) => {
  weexErosPlatform = 'ANDROID'
  done()
})

gulp.task('weex-aros-all', (done) => {
  weexErosPlatform = 'ALL'
  done()
})

gulp.task('clean', (done) => {
  weexErosPlatform = ''
  return gulp.src('dist', {
    read: false
  })
    .pipe(clean({
      force: true
    }))
})

gulp.task('cleanAll', (done) => {
  return gulp.src(['dist', 'node_modules'], {
    read: false
  })
    .pipe(clean({
      force: true
    }))
})

gulp.task('build-js', (callback) => {
  webpackInstance.run((err, stats) => {
    if (!err) {
      process.stdout.write(stats.toString({
        warnings: !!readConfig.get('webpackWarnings'),
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
    } else {
      console.log('Error !!!!!!!!!!!!!')
      console.log(err)
    }

    console.log(new Date())
    callback()
  })
})

// 解决 weex debug 时找不到 widget 方法
gulp.task('compatible-weex-debug', (done) => {
  let tasks = []
  const appBoardPath = path.resolve(process.cwd(), `dist/js${readConfig.get('appBoard')}`)
  getFiles.getAllFiles(path.resolve(process.cwd(), 'dist/js'), 'js').map((element) => {
    if (element === appBoardPath) return
    const distDir = path.resolve(element, '../')

    tasks.push(gulp.src(element)
      .pipe(weexUtil.addAppBoardWhenDev(appBoardPath))
      .pipe(gulp.dest(distDir, {
        mode: '0777'
      })))
  })
  if (!tasks.length) done()
  return merge(tasks)
})

gulp.task('weex:js', ['build-js'], (done) => {
  var tasks = []
  getFiles.getAllFiles(path.resolve(process.cwd(), 'dist/js'), 'js').map((element) => {
    var distDir = path.resolve(element, '../')

    tasks.push(gulp.src(element)
      .pipe(weexUtil.addFramework(readConfig.get('framework')))
      .pipe(gulp.dest(distDir, {
        mode: '0777'
      })))
  })

  if (!tasks.length) {
    done()
  }
  return merge(tasks).pipe(logger.time('build-weex-js')).on('end', (done) => {
    // 修复只能打pages的bug
    var _source = path.resolve(process.cwd(), 'dist/js')
    var _tmppath = path.resolve(process.cwd(), 'dist/_pages')
    var _target = path.resolve(process.cwd(), 'dist/js/_pages')
    // var _iconpath = path.resolve(process.cwd(), 'dist/iconfont')
    // var _assetspath = path.resolve(process.cwd(), 'dist/assets')

    shell.cp('-r', _source, _tmppath)
    shell.mv('-f', _tmppath, _target)
    gulp.src('src/iconfont/**/*')
      .pipe(logger.time('build-iconfont'))
      .pipe(weexUtil.getIconfontMd5())
      .pipe(gulp.dest('dist/js/_pages/iconfont', {
        mode: '0777'
      }))
      .on('end', function () {
        gulp.src('src/assets/**/*')
          .pipe(weexUtil.getAssetsMd5())
          .pipe(logger.time('build-assets'))
          .pipe(gulp.dest('dist/js/_pages/assets', {
            mode: '0777'
          }))
          .on('end', function () {
            weexUtil.minWeex(weexErosPlatform)
          })
      })
  })
})

let clients = []
const uuid = require('node-uuid')

gulp.task('socket', (done) => {
  let socketServer = readConfig.get('socketServer')
  let server = readConfig.get('server')
  let isSSL = argv.s || argv.ssl
  let devPort = server[isSSL ? 'httpsPort' : 'port']

  if (socketServer && socketServer.switch) {
    let WebSocketServer = require('ws').Server
    let wss = new WebSocketServer({ port: socketServer.port })
    wss.on('connection', (ws) => {
      let deviceId = uuid.v4()
      clients.push({ deviceId, ws })
      logger.success(`Your device ${deviceId} had been connected to the socket server.`)
      ws.on('pong', () => {
        this.isAlive = true
      })

      ws.on('close', () => {
        for (var i = 0, len = clients.length; i < len; i++) {
          if (clients[i].deviceId === deviceId) {
            clients.splice(i, 1)
            logger.warning(`Your device ${deviceId} had left this socket.`)
            break
          }
        }
      })

      ws.on('error', (e) => {
        logger.warning('Socket error:' + e)
      })
    })
  }
  logger.sep()
  logger.success('Service started successfully!' + '   ( End server by Ctrl + C )'.yellow)
  logger.log('dev server started in port : ' + devPort.toString().green)
  socketServer.switch && logger.log('dev socket started in port : ' + socketServer.port.toString().green)
  // logger.log('mock server start success  : ' + mockPort.toString().green)
  logger.log('enjoy it and aros loves you !')
  done()
})

gulp.task('socket-send-refresh', (done) => {
  if (!clients.length) {
    done()
    return
  }
  clients.map((client) => {
    (client.ws.readyState !== 2) && client.ws.send('SERVER/JS_BUNDLE_CHANGED')
  })
  done()
})
let isFirstReload = true
gulp.task('handle-config-native', (done) => {
  let server = readConfig.get('server')
  let socketServerPort = readConfig.get('socketServer').port
  let isSSL = argv.s || argv.ssl
  let devPort = server[isSSL ? 'httpsPort' : 'port']
  let nativeConfig = readConfig.readNativeConfig()

  const IP = serverUtil.getIPAddress()
  if (serverUtil.isIPChanged(IP)) logger.log(`Your IP address has changed to ${IP}.`)
  serverUtil.iPRecord(IP)

  nativeConfig.ip = IP
  if (!nativeConfig.url.jsServer) {
    nativeConfig.url.jsServer = `${isSSL ? 'https' : 'http'}://${IP}:${devPort}`
  }
  if (!nativeConfig.url.socketServer) {
    nativeConfig.url.socketServer = `ws://${IP}:${socketServerPort}`
  }
  // 加密
  nativeConfig = weexUtil._encrypt(nativeConfig)
  weexErosPackUtil._writeJsonToIos('app.native.json', nativeConfig)
  weexErosPackUtil._writeJsonToAndroid('app.native.json', nativeConfig)
  if (isFirstReload) {
    isFirstReload = false
    logger.log('Reload app.native.js done.')
  } else {
    logger.success('Reload app.native.js done, you can rebuild your app to take effect.')
  }
  done()
})

// 文件监听
gulp.task('watch', (done) => {
  logger.log('Start to watching files...')
  gulp.watch('config/app/app.native.js', ['handle-config-native'])
  gulp.watch('src/**/*', ['weex-dev'])
  gulp.watch('src/assets/**/*', ['build-assets'])
  gulp.watch('src/iconfont/**/*', ['build-iconfont'])
  done()
})

gulp.task('dev', (callback) => {
  // gulpSequence('clean', ['build-assets', 'build-iconfont', 'build-mock', 'build-js'], ['start-mock', 'handle-config-native', "compatible-weex-debug", 'watch', 'socket'])(callback)
  gulpSequence('clean', ['build-js'], ['handle-config-native', 'compatible-weex-debug', 'watch', 'socket'])(callback)
})

gulp.task('weex', (callback) => {
  gulpSequence('clean', 'weex:js')(callback)
})

gulp.task('weex-dev', (callback) => {
  gulpSequence('build-js', 'compatible-weex-debug', 'socket-send-refresh')(callback)
})
gulp.task('weex-aros:ios', (callback) => {
  gulpSequence('clean', 'weex-aros-ios', 'handle-config-native', 'weex:js')(callback)
})
gulp.task('weex-aros:android', (callback) => {
  gulpSequence('clean', 'weex-aros-android', 'handle-config-native', 'weex:js')(callback)
})
gulp.task('weex-aros:all', (callback) => {
  gulpSequence('clean', 'weex-aros-all', 'handle-config-native', 'weex:js')(callback)
})

module.exports = {
  start: (type) => {
    gulp.start(type)
  }
}
