const fs = require('fs')
const os = require('os')
const path = require('path')
const MpvuePlugin = require('webpack-mpvue-asset-plugin')
const MpvueEntry = require('mpvue-entry')
const HappyPack = require('happypack')
const utils = require('./utils')
const config = require('../../config/min')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '../..', dir)
}

const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})

module.exports = {
  // 通过 src/pages.js 来配置要打包的页面，
  entry: MpvueEntry.getEntry({
    pages: '../src/router/routes.js',
    template: '../src/_start/min/main.js',
    app: '../dist/min/app.json'
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
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'mpvue',
      '@': resolve('src'),
      'elements/plt': resolve('src/elements/min'),
      'elements': resolve('src/elements/')
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
