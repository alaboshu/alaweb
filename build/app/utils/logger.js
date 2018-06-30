const chalk = require('chalk')
const format = require('util').format
const through = require('through2')
const print = require('./print')
const pretty = require('pretty-hrtime')
/**
 * Prefix.
 */

const prefix = 'eros'
const sep = chalk.gray('·')

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */

exports.log = function (...args) {
  const msg = format.apply(format, args)
  console.log('[' + chalk.blue(prefix) + ']', sep, chalk.white(msg))
}

/**
 * Warning a `message` to the console.
 *
 * @param {String} message
 */

exports.warning = function (...args) {
  const msg = format.apply(format, args)
  console.log('[' + chalk.blue(prefix) + ']', sep, chalk.yellow(msg))
}

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

exports.fatal = function (...args) {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.log('[' + chalk.blue(prefix) + ']', sep, chalk.red(msg))
  process.exit(1)
}

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */

exports.success = function (...args) {
  const msg = format.apply(format, args)
  console.log('[' + chalk.blue(prefix) + ']', sep, chalk.green(msg))
}

exports.sep = function () {
  console.log()
}

exports.time = function (name) {
  let start = process.hrtime()
  let stream = through.obj({
    objectMode: true
  })

  stream.start = resetStart

  name = '' + name + ': '

  return stream.once('end', function () {
    let time = pretty(process.hrtime(start))
    let msg = print.fixempty(name, 30, '>') + time.magenta

    console.log('[' + chalk.blue(prefix) + ']', sep, chalk.green(msg))
  })

  function resetStart () {
    start = process.hrtime()
  }
}
