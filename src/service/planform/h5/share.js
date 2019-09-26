import http from '@/service/all/http'
import api from '@/service/api'
import wx from 'weixin-js-sdk'
export default {
  show: function (title, imageUrl, description, urls) {
    if (api.client() === 'WeChat') {
      var url = window.location.href
      if (urls !== undefined) {
        url = urls
      }
      if (window.location.href.indexOf('/articles/topline/show') !== -1) {
        title = document.title
      }
      title = '企牛牛'
      var para = {
        url: url,
        title: title,
        imageUrl: imageUrl,
        description: description
      }
      http.get('/Api/ApiStore/Share', para).then(function (res) {
        var getMsg = res.result
        wx.config({
          debug: false, // 生产环境需要关闭debug模式
          appId: getMsg.appId, // appId通过微信服务号后台查看
          timestamp: getMsg.timestamp, // 生成签名的时间戳
          nonceStr: getMsg.nonceStr, // 生成签名的随机字符串
          signature: getMsg.signature, // 签名
          jsApiList: [
            // 需要调用的JS接口列表z
            'onMenuShareTimeline', // 分享给好友
            'onMenuShareAppMessage', // 分享到朋友圈
            'showMenuItems',
            'hideMenuItems',
            'chooseWXPay',
            'getBrandWCPayRequest',
            'updateAppMessageShareData',
            'updateTimelineShareData'
          ]
        })

        wx.ready(function () {
          wx.updateAppMessageShareData({ // 好友
            title: '企牛牛', // 分享标题
            desc: description, // 分享描述
            link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imageUrl, // 分享图标
            success: function () {
              // 设置成功
            }
          })
          wx.updateTimelineShareData({ // 朋友圈
            title: '企牛牛' + description, // 分享标题
            desc: description, // 分享描述
            link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imageUrl, // 分享图标
            success: function () {
              // 设置成功
            }
          })
          // wx.onMenuShareTimeline({ // 朋友圈
          //   title: '企牛牛' + description, // 分享标题
          //   desc: description, // 分享描述
          //   link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          //   imgUrl: imageUrl, // 分享图标
          //   success: function (res) {},
          //   cancel: function (res) {
          //     // 用户取消分享后执行的回调函数
          //   }
          // })
          // wx.onMenuShareAppMessage({ // 好友
          //   title: '企牛牛', // 分享标题
          //   desc: description, // 分享描述
          //   link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          //   imgUrl: imageUrl, // 分享图标
          //   type: '', // 分享类型,music、video或link，不填默认为link
          //   dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          //   success: function (res) {},
          //   cancel: function (res) {
          //     // 用户取消分享后执行的回调函数
          //   }
          // })
          // uni.share({
          //   provider: 'weixin',
          //   scene: 'WXSceneSession',
          //   type: 0,
          //   href: window.location.href, // 这地址太长了，就省略了
          //   title: title,
          //   summary: description,
          //   imageUrl: imageUrl,
          //   success: function (res) {
          //   },
          //   fail: function (err) {
          //   }
          // })
        })
      })
    }
  }
}
