// #ifdef H5
import share from '@/service/planform/h5/share'
// #endif

import shareApp from '@/service/planform/app/share'

// #ifdef APP-PLUS
const wushare = uni.requireNativePlugin('WUApp-Share')
// #endif
// // #ifndef H5
// import share from '@/service/planform/mp/share'
// // #endif
export default {
  /** 微信分享 */
  share (title, imageUrl, desc, url) {
    if (this.client() === 'AppPlus' && this.payType() === 4) {
      shareApp.appShare(title, url, desc, imageUrl)
    } else if (this.client() === 'AppPlus' && this.payType() === 3) {
      // #ifdef APP-PLUS
      wushare.iosShare({
          text: title,
          url: url
        },
        result => {
          if (result.completed) {} else {}
        }
      )
      // #endif
    } else {
      setTimeout(function () {
        return share.show(title, imageUrl, desc, url)
      }, 500)
    }
  }
}
