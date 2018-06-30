var readline = require('readline')
var path = require('path')
var logger = require('../../utils/logger')
var Process = require('child_process')

function readSyncByRl (tips) {
  tips = tips || '> '
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.question(tips, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

function installIosDep () {
  logger.log('installing ios sdk...')
  console.time('[' + 'eros'.blue + '] ' + 'ios installing time consuming: '.green)
  var build = Process.exec(path.resolve(process.cwd(), './platforms/ios/WeexEros/install.sh'),
    { cwd: path.resolve(process.cwd(), './platforms/ios/WeexEros/') },
    function (error, stdout, stderr) {
      if (error) {
        console.log(error.message)
      }
      console.timeEnd('[' + 'eros'.blue + '] ' + 'ios installing time consuming: '.green)
    })
  build.stdout.on('data', function (data) {
    console.log(data)
  })
  build.stderr.on('data', function (data) {
    console.log(data)
  })
};

function installAndroidDep () {
  logger.log('installing android sdk...')
  console.time('[' + 'eros'.blue + '] ' + 'android installing time consuming: '.green)
  var build = Process.exec(path.resolve(process.cwd(), './platforms/android/WeexFrameworkWrapper/install.sh'), { cwd: path.resolve(process.cwd(), './platforms/android/WeexFrameworkWrapper/') }, function (error, stdout, stderr) {
    if (error) {
      console.log(error.message)
    }
    console.timeEnd('[' + 'eros'.blue + '] ' + 'android installing time consuming: '.green)
  })
  build.stdout.on('data', function (data) {
    console.log(data)
  })
  build.stderr.on('data', function (data) {
    console.log(data)
  })
};

function runiOSInstallScript (callback) {
  console.time('[' + 'eros'.blue + '] ' + 'ios installing time consuming: '.green)
  var build = Process.exec(path.resolve(process.cwd(), './scripts/install.ios.sh'), { cwd: process.cwd() }, function (error, stdout, stderr) {
    if (error) {
      console.log(error.message)
    }
    console.timeEnd('[' + 'eros'.blue + '] ' + 'ios installing time consuming: '.green)
    callback && callback()
  })
  build.stdout.on('data', function (data) {
    console.log(data)
  })
  build.stderr.on('data', function (data) {
    console.log(data)
  })
}
function runAndroidInstallScript (callback) {
  console.time('[' + 'eros'.blue + '] ' + 'android installing time consuming: '.green)
  var build = Process.exec(path.resolve(process.cwd(), './scripts/install.android.sh'), { cwd: process.cwd() }, function (error, stdout, stderr) {
    if (error) {
      console.log(error.message)
    }
    console.timeEnd('[' + 'eros'.blue + '] ' + 'android installing time consuming: '.green)
    callback && callback()
  })
  build.stdout.on('data', function (data) {
    console.log(data)
  })
  build.stderr.on('data', function (data) {
    console.log(data)
  })
}

function runAllInstallScript () {
  runiOSInstallScript(runAndroidInstallScript)
}

function runiOSUpdateScript () {
  console.time('[' + 'eros'.blue + '] ' + 'ios updating time consuming: '.green)
  var build = Process.exec(path.resolve(process.cwd(), './scripts/update.ios.sh'), { cwd: process.cwd() }, function (error, stdout, stderr) {
    if (error) {
      console.log(error.message)
    }
    console.timeEnd('[' + 'eros'.blue + '] ' + 'ios updating time consuming: '.green)
  })
  build.stdout.on('data', function (data) {
    console.log(data)
  })
  build.stderr.on('data', function (data) {
    console.log(data)
  })
}
function runAndroidUpdateScript () {
  console.time('[' + 'eros'.blue + '] ' + 'android updating time consuming: '.green)
  var build = Process.exec(path.resolve(process.cwd(), './scripts/update.android.sh'), { cwd: process.cwd() }, function (error, stdout, stderr) {
    if (error) {
      console.log(error.message)
    }
    console.timeEnd('[' + 'eros'.blue + '] ' + 'android updating time consuming: '.green)
  })
  build.stdout.on('data', function (data) {
    console.log(data)
  })
  build.stderr.on('data', function (data) {
    console.log(data)
  })
}
module.exports = {
  readSyncByRl: readSyncByRl,
  installIosDep: installIosDep,
  installAndroidDep: installAndroidDep,
  runiOSInstallScript: runiOSInstallScript,
  runAndroidInstallScript: runAndroidInstallScript,
  runAllInstallScript: runAllInstallScript,
  runiOSUpdateScript: runiOSUpdateScript,
  runAndroidUpdateScript: runAndroidUpdateScript
}
