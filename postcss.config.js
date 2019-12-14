const pkg = require('./package.json')

module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: pkg.browserslist
    }),
    require('@dcloudio/vue-cli-plugin-uni/packages/postcss')
  ]
}
