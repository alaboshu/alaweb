module.exports = {
  'appName': 'zkweb',
  'appBoard': '/config/index.js',
  // android 监听全局事件homeBack 如果为true 安卓端需要自行调用router.finish方法来关闭应用
  'androidIsListenHomeBack': 'true',
  'version': {
    'android': '1.0.0',
    'iOS': '1.0.0'
  },
  'versionCode': {
    'android': '1',
    'iOS': '1'
  },
  'page': {
    'homePage': '/pages/index.js',
    'mediatorPage': '/pages/mediator/index.js',
    'navBarColor': '#309bf8',
    'navItemColor': '#ffffff'
  },
  'url': {
    'image': ''
    // 'bundleUpdate': 'https://www.zlgcloud.com/debug/app/solarApp/version.json',
  },
  'zipFolder': {
    'iOS': '/ios/WeexEros/WeexEros',
    'android': '/android/app/src/main/assets'
  },
  'getui': {
    'enabled': 'false',
    'appId': '',
    'appKey': '',
    'appSecret': ''
  },
  'umeng': {
    'enabled': 'false',
    'iOSAppKey': '',
    'androidAppKey': ''
  },
  'wechat': {
    'enabled': 'false',
    'appId': '',
    'appSecret': ''
  },
  'qq': {
    'enabled': 'false',
    'appId': '',
    'appKey': ''
  },
  'weibo': {
    'enabled': 'false',
    'appId': '',
    'appSecret': ''
  },
  'amap': {
    'enabled': 'false',
    'iOSAppKey': '',
    'androidAppKey': ''
  }
}
