'use strict'
const fs = require('fs')
const os = require('os')
const path = require('path')
const HappyPack = require('happypack')
const utils = require('./utils')
const config = require('../../config/h5')
const vueLoaderConfig = require('./vue-loader.conf')
const glob = require('glob')

function resolve (dir) {
  return path.join(__dirname, '../..', dir)
}

const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})

function getEntry (rootSrc, pattern) {
  const files = glob.sync(path.resolve(rootSrc, pattern))
  return files.map((file) => {
    const relativePath = path.relative(rootSrc, file).replace(/\\/g, '/').replace('.vue', '')
    return {
      path: `/${relativePath}`,
      name: relativePath.replace(/\/(.)/g, (match, $1) => $1.toUpperCase()),
      component: `${relativePath}.vue`
    }
  })
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

const routes = getEntry(resolve('./src'), 'pages/**/*.vue')
const routesStr = JSON.stringify(routes, null, '  ')
fs.writeFileSync(resolve('./src/router/routes.js'), `/* eslint-disable */\nmodule.exports = ${routesStr.replace(/"component": "(.*)"/g, '"component": () => import("@/$1")')}`)

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: '../src/_start/h5/main.js',
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.less'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@/elements/plt': resolve('src/elements/h5'),
      '@': resolve('src'),
      flyio: 'flyio/dist/npm/fly',
      wx: resolve('src/utils/wx')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'happyBabel',
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true'
      }],
      threadPool: happyThreadPool,
      verbose: true
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
