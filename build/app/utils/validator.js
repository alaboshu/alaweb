const fs = require('fs')
const path = require('path')

/**
 * Verifies this is an Android project
 * @param {String} root directory path
 */
function checkAndroid (cwd, dir) {
  var p = path.join(cwd, 'platforms/android/' + dir + '/gradlew')
  return fs.existsSync(p)
}

/**
 * Verifies there has a ios folder
 * @param {String} root directory path
 */
function checkIOS (cwd) {
  // return fs.existsSync(path.join(cwd, 'ios/playground'))
  return fs.existsSync(path.join(cwd, 'platforms/ios'))
}

/**
 * Check if current cli is running on Windows platform
 */
function isOnWindows () {
  return /^win/.test(process.platform)
}

/**
 * Check if current cli is running on OSX platform
 */
function isOnMac () {
  return process.platform === 'darwin'
}

/**
 * Check if current cli is running on Linux platform
 */
function isOnLinux () {
  return process.platform === 'linux'
}

function isValidPackageName (name) {
  return name.match(/^[$A-Z_][0-9A-Z_$]*$/i)
}

module.exports = {
  checkAndroid,
  checkIOS,
  isOnWindows,
  isOnMac,
  isOnLinux,
  isValidPackageName
}
