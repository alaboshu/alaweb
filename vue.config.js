const webpack = require('webpack')
const {
  UNI_PLATFORM,
  ZK_DIY
} = process.env


module.exports = {
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

  }
}
