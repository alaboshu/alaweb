// 常用帮助函数
export default {

  // 判断字符串是否为空或null,undefined
  isEmpty (str) {
    if (str === undefined) {
      return true
    }
    if (str === null) {
      return true
    }
    if (str === 'null') {
      return true
    }
    if (str === 'undefined') {
      return true
    }
    if (str === '') {
      return true
    }
    var regu = '^[ ]+$'
    var re = new RegExp(regu)
    return re.test(str)
  },
  // 判断字符串长度
  length (str) {
    if (this.isEmpty(str)) {
      return 0
    } else {
      try {
        var len = str.length
        return len
      } catch (err) {
        return 0
      }
    }
  },
  // 获取URL中的参数
  query (name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    } else {
      return ''
    }
  }
}
