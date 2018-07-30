const fs = require('fs')
const os = require('os')
const path = require('path')
const MpvuePlugin = require('webpack-mpvue-asset-plugin')
const MpvueEntry = require('mpvue-entry')
const HappyPack = require('happypack')
const utils = require('./utils')
const config = require('../../config/min')
const vueLoaderConfig = require('./vue-loader.conf')
const glob = require('glob')

function resolve (dir) {
  return path.join(__dirname, '../..', dir)
}

const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})

function trimStr (str) {
  return str.trim().replace(/['|"],?/g, '')
}

function getRoutes (rootSrc, pattern) {
  const files = glob.sync(path.resolve(rootSrc, pattern))
  return files.map((file) => {
    const configMatched = fs.readFileSync(file).toString().match(/config: {([^]*?)}/)
    const config = configMatched && RegExp.$1.match(/['|"]?(.*)['|"]?: ?['|"]?(.*)['|"]?/g).reduce((result, current) => {
      const configParsed = current.replace(' ', '').split(':')
      const configKey = trimStr(configParsed[0])
      const configVal = trimStr(configParsed[1])
      return Object.assign(result, {
        [configKey]: configVal === 'true' ? true : configVal
      })
    }, {})
    return {
      path: path.relative(rootSrc, file).replace(/\\/g, '/').replace('.vue', ''),
      config: config || {}
    }
  })
}

const routes = getRoutes(resolve('./src'), 'pages/**/*.vue')
const routesStr = JSON.stringify(routes, null, '  ')
fs.writeFileSync(resolve('./src/router/routes.json'), routesStr)

module.exports = {
  // 通过 src/pages.js 来配置要打包的页面，
  entry: MpvueEntry.getEntry({
    pages: '../../src/router/routes.json',
    template: '../../src/_start/min/main.js',
    app: '../../dist/min/app.json'
  }),
  target: require('mpvue-webpack-target'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.less'],
    alias: {
      'vue': 'mpvue',
      '@/elements/plt': resolve('src/elements/min'),
      '@': resolve('src'),
      '_style': resolve('src/assets/style/min'),
      flyio: 'flyio/dist/npm/wx',
      wx: resolve('src/utils/wx')
    },
    symlinks: false,
    aliasFields: ['mpvue', 'weapp', 'browser'],
    mainFields: ['browser', 'module', 'main']
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: resolve('src'),
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.vue$/,
      loader: 'mpvue-loader',
      options: vueLoaderConfig
    },
    {
      test: /\.js$/,
      include: resolve('src'),
      use: [
        'happypack/loader?id=happyBabel',
        {
          loader: 'mpvue-loader',
          options: {
            checkMPEntry: true
          }
        }
      ]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        name: utils.assetsPath('img/[name].[ext]')
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('media/[name].[ext]')
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        name: utils.assetsPath('fonts/[name].[ext]')
      }
    }
    ]
  },
  plugins: [
    new MpvuePlugin(),
    new MpvueEntry(),
    new HappyPack({
      id: 'happyBabel',
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true'
      }],
      threadPool: happyThreadPool,
      verbose: true
    })
  ]
}
