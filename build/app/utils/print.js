/**
 * @Author: songqi
 * @Date:   2016-07-12
 * @Email:  songqi@benmu-health.com
 * @Last modified by:   songqi
 * @Last modified time: 2016-09-14
 */

var logColors = require('colors')

logColors.setTheme({
  info: 'green',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
})

function fixempty (str, len, tag) {
  var _str = ''
  var space = []
  var spaceLen = 0
  var strLen = str.length
  if (strLen > len) {
    _str = str
  } else {
    spaceLen = len - strLen
    for (var i = spaceLen; i--;) {
      space.push(tag || ' ')
    }
    _str = str + space.join('')
  }
  return _str
}

function commonPrint () {
  console.info('')
  console.info('aros-cli:')
  console.info('')
  console.info('The following instructions are provided to help you build app !'.green)
  console.info('')
}

function title (config) {
  console.info(' ' + (fixempty(config.name, 10)) + ' | ' + (config.explain || ''))
}

function info (_info) {
  console.info('/******')
  console.info(_info)
  console.info('******/')
}

function command (config) {
  commonPrint()
  console.info(' name: ' + config.name)
  console.info(' desc: ' + config.explain)
  console.info(' ')
  console.info(' run: ' + config.command)
  console.info(' ')
  console.info(' params: ')
  config.options.map(function (item) {
    console.info(' ' + item.keys.join('，') + '  ' + item.describe)
  })
}

function log (msg) {
  console.info('**日志**：' + msg)
}

function gulpLog (name, times) {
  if (times >= 1000) {
    times = (times / 1000).toFixed(2) + ' s'
  } else {
    times = times + ' ms'
  }
  console.log('[' + logColors.debug('gulp') + ']' + logColors.info(fixempty(name, 30, '-')) + logColors.magenta(times))
}

module.exports = {
  log: log,
  info: info,
  title: title,
  gulpLog: gulpLog,
  command: command,
  fixempty: fixempty,
  commonPrint: commonPrint
}
