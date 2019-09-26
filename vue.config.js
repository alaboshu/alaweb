const webpack = require('webpack')
// const ThemePlugin = require('./lib/theme-plugin')

const {
  UNI_PLATFORM,
  ZK_DIY
} = process.env


module.exports = {
  // css: {
  //   extract: !!ZK_DIY
  // },
  configureWebpack: {
    devServer: {
      host: '0.0.0.0',
      port: '2000',
      disableHostCheck: true
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          UNI_PLATFORM: JSON.stringify(UNI_PLATFORM),
          ZK_DIY: JSON.stringify(ZK_DIY)
        }
      })
    ]
  },
  chainWebpack (config) {
    if (ZK_DIY) {
      // config
      //   .plugin('theme')
      //   .use(ThemePlugin)

      // config
      //   .resolveLoader
      //   .alias
      //   .set('sass-loader', './lib/diy-loader')
    }
  }
}
