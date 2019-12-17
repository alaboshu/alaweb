// 处理兼容性问题
export default {
  // 屏幕宽度兼容性
  screenWidth (jsThis) {
    if (jsThis.$api.client() === 'WapH5') {
      return 50
    } else {
      return -50
    }
  }
}
