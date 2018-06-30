/**
* @Author: songqi
* @Date:   2016-07-15
* @Email:  songqi@benmu-health.com
* @Last modified by:   songqi
* @Last modified time: 2017-01-13
*/

var fs = require('fs')
var path = require('path')
var readConfig = require('./readConfig')

var ALIAS = readConfig.get('alias')
var EXPORTS = readConfig.get('exports')
var BOWERDIR = path.resolve(process.cwd(), 'bower_components')

function getExportsPath (item, type) {
  var _path = item.split('!')
  /* eslint-disable */
  var _regExp = new RegExp('(.+)\.' + type + '$')
  var tagType = _path[1]
  var files = []
  var matchs
  var sourcetype
  if (tagType && tagType.match && tagType.match(/dir/)) {
    sourcetype = tagType.split('-')
    if (sourcetype[1] === type) {
      return getExportsFiles(type, path.resolve(process.cwd(), 'src', _path[0]), _path[0] + '/')
    }
  }
  if (!tagType) {
    matchs = item.match(_regExp)
    // 添加less处理
    if ((item.indexOf('.less') > -1 && type === 'css') || (matchs && type === 'css')) {
      files.push(path.resolve(process.cwd(), 'src', item))
      return files
    }
    if (matchs && (type === 'js' || type === 'we')) {
      files[matchs[1]] = path.resolve(process.cwd(), 'src', item)
      return files
    }
  }
  return false
}

function getExportsFiles (type, dir) {
  var stat
  try {
    stat = fs.statSync(dir)
  } catch (e) { }

  if (!stat) {
    return []
  }
  var dirs = fs.readdirSync(dir)
  /* eslint-disable */
  var _regExp = new RegExp('(.+)\.' + type + '$')
  var files = []
  var matchs = []
  if (dirs && dirs.length) {
    dirs.forEach(function (item) {
      matchs = item.match(_regExp)
      if (matchs) {
        files.push(path.resolve(dir, item))
      }
    })
  }
  return files
}

function getExports (type) {
  var files = []
  var flag = false
  if (EXPORTS && EXPORTS.length) {
    // var matchs = []
    EXPORTS.map(function (item) {
      var pathData = getExportsPath(item, type)
      if (pathData) {
        flag = true
        files = files.concat(pathData)
      }
    })
  }
  if (!flag) {
    files = getExportsFiles(type, path.resolve(process.cwd(), './src/' + type + '/exports'), type + '/')
  }
  return files
}

// 获取多页面的每个入口文件，用于配置中的entry
function getEntry () {
  var type = 'js'
  var files = {}
  var flag = false
  if (EXPORTS && EXPORTS.length) {
    // var matchs = []
    EXPORTS.map(function (item) {
      var pathData = getExportsPath(item, type)
      if (pathData) {
        flag = true
        Object.assign(files, pathData)
      }
    })
  }
  if (!flag) {
    files = getExportsFiles(type, path.resolve(process.cwd(), './src/' + type + '/exports'), type + '/')
  }
  return files
}

// 获取所有的 bower alias
function getBowerAlias () {
  var stat
  var files = {}
  try {
    stat = fs.statSync(BOWERDIR)
  } catch (e) {
    // console.log('bower_components not exist')
  }
  if (stat && stat.isDirectory()) {
    var dirs = fs.readdirSync(BOWERDIR)
    dirs.forEach(function (item) {
      var bowerPath = getBowerConfigFile(path.resolve(BOWERDIR, item))
      if (bowerPath) {
        var _file = JSON.parse(fs.readFileSync(bowerPath, 'utf8'))
        if (_file) {
          var _path = _file.main
          if (Array.isArray(_file.main)) {
            _file.main.map(function (_item) {
              var matchRes = _item.match(/.js/)
              if (matchRes && matchRes.length) {
                files[_file.name] = path.resolve(BOWERDIR, item, _item)
              }
            })
          } else {
            files[_file.name] = path.resolve(BOWERDIR, item, _path)
          }
        }
      }
    })
  }
  return files
}

// 获取 bower_components 中的配置文件
function getBowerConfigFile (bowerConfigDir) {
  var stat
  var _bowerPath = path.resolve(bowerConfigDir, 'bower.json')
  var _packagePath = path.resolve(bowerConfigDir, 'package.json')
  try {
    stat = fs.statSync(_bowerPath)
  } catch (e) { }

  if (stat) {
    return _bowerPath
  }

  try {
    stat = fs.statSync(_packagePath)
  } catch (e) { }

  if (stat) {
    return _packagePath
  }

  return false
}

function getFileAlias () {
  var aliasPath = {}
  if (ALIAS) {
    for (var i in ALIAS) {
      aliasPath[i] = path.resolve(process.cwd(), 'src', ALIAS[i])
    }
  }
  return aliasPath
}

// 获取 alias 代码
function getAlias () {
  var bowerAlias = getBowerAlias()
  var filesAlias = getFileAlias()
  return Object.assign({}, bowerAlias, filesAlias)
}

function getAllFiles (filePath, type) {
  var stat
  var files = []
  var _regExp = new RegExp('(.+)\.' + type + '$')
  try {
    stat = fs.statSync(filePath)
  } catch (e) {
    console.log(filePath + 'not exist')
  }
  if (!stat) {
    return []
  }

  if (stat && stat.isDirectory()) {
    var _filePath = fs.readdirSync(filePath)
    _filePath.map((item) => {
      var _path = path.resolve(filePath, item)
      files = files.concat(getAllFiles(_path, type))
    })
  } else {
    if (filePath.match(_regExp)) {
      return filePath
    }
  }
  return files
}

module.exports = {
  getAlias: getAlias,
  getEntry: getEntry,
  getExports: getExports,
  getAllFiles: getAllFiles
}
