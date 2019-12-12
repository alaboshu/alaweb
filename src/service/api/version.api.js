import api from '@/service/api.js'

export default {
  // 获取类型的keyvalues对象 // 优先从Url中获取数据
  async checkVersion (type, apiUrl) {
    /* eslint-disable */
    var version
    if (api.client() === 'AppPlus' && api.payType() === 4) {
      plus.runtime.getProperty(plus.runtime.appid, async function (wgtinfo) {
        version = wgtinfo.version

        let par = {
          AppClient: api.payType(),
          Version: version
        }
        var response = await api.httpGet('Api/AppVersion/AppCheckVersion', par)
        if (response.status === 1) {
          if (response.result.status === 1) {
            uni.showModal({
              title: '发现新版本',
              content: response.result.note,
              success: function (res) {
                if (res.confirm) {
                  // var url = encodeURI(response.result.url)
                  // plus.runtime.openURL(url, function (res) {})
                } else if (res.cancel) {}
              }
            })
          }
        }
      })
    }
  }
}
