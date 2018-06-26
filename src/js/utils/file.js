'use strict'
// 文件操作，在微信小程序中，不引用
var glob = require('glob')
var ROOT_PATH = path.resolve(__dirname)
var APP_PATH = path.resolve(ROOT_PATH, 'app')
const fs = require('fs')
export default {
  // 写入文件
  write(path, data) {
    fs.writeFile(path, data, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('ok')
      }
    })
  },
  // 读取文件
  read(path) {
    fs.readFile(path, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
        console.log(data.length + 'bayes')
      }
    })
  },

  resolve(dir) {
    return path.join(__dirname, '..', dir)
  }

  // 获取页面上所有的vue文件
  // 示列：const pagesEntry = getEntry(resolve('./src'), 'pages/**.v
  getPage(rootSrc, pattern) {
    // 同步获取指定文件（App_PATH）夹下的文件（全部.js文件）
    var entryFiles = glob.sync(APP_PATH + '/*.js')
    var files = glob.sync(path.resolve(rootSrc, pattern))
    console.info('文件', files)
    return files.reduce((res, file) => {
      var info = path.parse(file)
      var key = info.dir.slice(rootSrc.length + 1) + '/' + info.name
      res[key] = path.resolve(file)
      return res
    }, {})
  }

}
