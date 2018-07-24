// appBoard，mediator 不建议进行修改 如果修改了 也请对应修改
module.exports = {
  eslint: false,
  webpackWarnings: false,
  exports: [
    '_start/app/main.js',
    'pages/index.vue',
    '_start/app/mediator/index.vue'
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
    port: 2001
  },
  socketServer: {
    port: 2002,
    switch: true
  },
  localZipFolder: {
    iOS: 'ios/WeexEros/WeexEros',
    android: 'android/WeexFrameworkWrapper/app/src/main/assets'
  }
}
