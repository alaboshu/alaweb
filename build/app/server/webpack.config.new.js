const path = require('path')
const webpack = require('webpack')
const argv = require('yargs').argv
const readConfig = require('../utils/readConfig')
const getFiles = require('../utils/getWebpackFiles')
const isDev = argv._[0] === 'dev'
const isProd = argv._[0] === 'build' || argv._[0] === 'pack'
const os = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

process.noDeprecation = true

function resolve (relativePath) {
  return path.join(process.cwd(), relativePath)
}

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    async: 'shared-module',
    minChunks: (module, count) => count >= 2
  }),
  new HappyPack({
    id: 'babel',
    verbose: false,
    loaders: ['babel-loader?cacheDirectory=true'],
    threadPool: happyThreadPool
  }),
  new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
  })
]

const nativeCfg = {
  cache: true,
  entry: getFiles.getEntry(),
  output: {
    path: resolve('dist/js'),
    publicPath: resolve('dist/js/'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
    // umdNamedDefine: false
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, '../../../', 'node_modules')]
  },
  stats: {
    colors: true,
    modules: false,
    reasons: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'happypack/loader?id=babel',
        include: [
          resolve('node_modules'),
          resolve('src')
        ]
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        include: [
          resolve('node_modules'),
          resolve('src')
        ],
        use: [{
          loader: 'weex-loader',
          options: {
            loaders: {
              sass: ['sass-loader'],
              scss: ['sass-loader'],
              less: ['less-loader'],
              stylus: ['stylus-loader']
            }
          }
        }]
      }
    ]
  },
  plugins,
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.less', '.sass'],
    alias: getFiles.getAlias(),
    modules: [
      resolve('node_modules')
    ]
  }
}

if (readConfig.get('eslint')) {
  nativeCfg.module.rules.unshift({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: resolve('src'),
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  })
}

if (isDev) {
  nativeCfg.devtool = readConfig.get('webpackDevtool') || 'eval'
  nativeCfg.plugins = nativeCfg.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ])
} else if (isProd) {
  nativeCfg.devtool = readConfig.get('webpackProdtool') || 'cheap-module-source-map'
  nativeCfg.plugins = nativeCfg.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      global: '{}'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  ])
}
module.exports = readConfig.getAllConfig() ? webpack(nativeCfg) : false
