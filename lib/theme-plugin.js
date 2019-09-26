class ThemePlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('ThemePlugin', (compilation) => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
        'ThemePlugin',
        (data, cb) => {
          data.head = data.head.map(item => {
            if (item.attributes && /\.css$/.test(item.attributes.href)) {
              item.attributes.rel = 'stylesheet/scss'
            }
            return item
          })
          return cb(null, data)
        }
      )
    })
  }
}

module.exports = ThemePlugin
