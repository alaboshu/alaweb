module.exports = function (source) {
  const { resourcePath } = this
  const matchResult = resourcePath.match(
    /.*components[\/|\\\\](.*?)[\/|\\\\](.*?)[\/|\\\\].*/
  )

  if (!matchResult) {
    return source.replace(/$gl-/g, '@')
  }

  return (
    source
      // 添加模块名前缀
      .replace(/@(.*);/g, (match, $1) => {
        if (/^(gl|import)/.test($1)) {
          return match
        }

        const widget = matchResult[2]

        return `@${widget}-${$1};`
      })
  )
}
