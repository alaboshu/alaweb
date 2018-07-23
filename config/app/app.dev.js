// appBoard，mediator 不建议进行修改 如果修改了 也请对应修改
module.exports = {
  eslint: false,
  webpackWarnings: false,
  exports: [
    'config/index.js',
    'pages/index.vue',
    'pages/mediator/index.vue'
  ],
  alias: {
    Components: 'components',
    Utils: 'utils',
    Css: 'css',
    Service: 'service',
    Widget: 'widget'
  },
  diff: {
    pwd: 'JSBundles/complete',
    proxy: 'https://app.weex-eros.com/source'
  },
  server: {
    path: './',
    port: 8889
  },
  socketServer: {
    port: 8890,
    switch: true
  },
  localZipFolder: {
    iOS: 'ios/WeexEros/WeexEros',
    android: 'android/WeexFrameworkWrapper/app/src/main/assets'
  }
}
