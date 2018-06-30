/**
 * Created by godsong on 16/12/7.
 */
const childProcess = require('childProcess')
const ProgressBar = require('./ProgressBar')
const Chalk = require('chalk')
const npm = require('npm')
const path = require('path')
const fs = require('fs')

const tar = require('tar')
const zlib = require('zlib')

exports.publish = function publish (tnpm, verbose, dir) {
  let pb = new ProgressBar(3000, 'publish', 'uploading...')
  let cmd = tnpm ? 'tnpm' : 'npm'
  return new Promise(function (resolve, reject) {
    childProcess.exec(cmd + ' publish', { cwd: dir || process.cwd() }, function (error, stdout, stderr) {
      pb.complete(function () {
        if (error) {
          console.log()
          let match = stderr.toString().replace(/npm ERR! /g, '').match(/\n\n([\s\w\W]+?)\n\n/)
          if (match && match[1]) {
            console.error(Chalk.red(match[1]))
          } else {
            console.error(Chalk.red(stderr.toString()))
          }
          console.log()
          return resolve(false)
        }
        resolve(true)
      })
    })
  })
}

exports.getLastestVersion = function (name, callback) {
  var trynum = 0
  npm.load(function () {
    var load = function (npmName) {
      npm.commands.info([npmName, 'version'], true, function (error, result) {
        if (error && trynum === 0) {
          trynum++
          let prefix = 'weex-plugin-'
          load(prefix + npmName)
        } else if (error && trynum !== 0) {
          throw new Error(error)
        } else {
          var version
          for (var p in result) {
            version = p
          }
          callback(version)
        }
      })
    }

    load(name)
  })
}

exports.fetchCache = function (npmName, version, callback) {
  npm.load(function () {
    npm.commands.cache(['add', (npmName + '@' + version)], function (error, result) {
      if (error) {
        throw new Error(error)
      } else {
        var packageDir = path.resolve(npm.cache, result.name, result.version, 'package')
        var packageTGZ = path.resolve(npm.cache, result.name, result.version, 'package.tgz')
        callback(packageTGZ, packageDir)
      }
    })
  })
}

exports.unpackTgz = function (packageTgz, unpackTarget, callback) {
  var extractOpts = { type: 'Directory', path: unpackTarget, strip: 1 }

  fs.createReadStream(packageTgz)
    .on('error', function (err) {
      console.warn('Unable to open tarball ' + packageTgz + ': ' + err)
    })
    .pipe(zlib.createUnzip())
    .on('error', function (err) {
      console.warn('Error during unzip for ' + packageTgz + ': ' + err)
    })
    .pipe(tar.Extract(extractOpts))
    .on('error', function (err) {
      console.warn('Error during untar for ' + packageTgz + ': ' + err)
    })
    .on('end', function (result) {
      callback(result)
    })
}

exports.prefix = 'weex-plugin--'
