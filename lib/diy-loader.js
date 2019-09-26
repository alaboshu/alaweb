module.exports = function (source) {
  return source
    .replace(/[^:]\/\/.*/g, '')
    .replace(/upx/g, 'px')
}
