export default {
  to (url) {
    url = this.getCurrentPath(url)
    if (url.indexOf('/pages/tabbar') > -1) {
      uni.switchTab({
        url: url
      })
    } else {
      uni.navigateTo({
        url: url
      })
    }
  },
  getCurrentPath (toPages) {
    var url
    var toPagesUrl = toPages
    var showSplit
    if (toPages.indexOf('?') > -1) {
      toPagesUrl = toPages.split('?')[0]
      showSplit = toPages.split('?')[1]
    }
    if (toPagesUrl.indexOf('/tabbar') === -1) {
      var linkSplit = toPagesUrl.split('/')
      url = '/pages/index?path='
      if (linkSplit.length === 2) {
        url += linkSplit[1]
      } else if (linkSplit.length === 3) {
        url += linkSplit[1] + '_' + linkSplit[2]
      } else if (linkSplit.length === 4) {
        url += linkSplit[1] + '_' + linkSplit[2] + '_' + linkSplit[3]
      }
      if (showSplit) {
        url += `&${showSplit}`
      }
    } else {
      url = toPages
    }
    return url
  }
}
