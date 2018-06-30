var argv = require('yargs').argv
var inquirer = require('inquirer')
var print = require('./utils/print')
var gulpServer = require('./server/gulpfile.js')
// var readSyncByRl = require('./util').readSyncByRl
var logger = require('./utils/logger')

var config = {
  name: 'pack',
  explain: 'pack full dose zip and send to aros platform project.',
  command: 'aros dev',
  options: [{
    keys: ['-h', '--help'],
    describe: 'read help'
  }, {
    keys: ['ios'],
    describe: 'pack ios full dose zip and send to aros ios platform.'
  }, {
    keys: ['android'],
    describe: 'pack ios full dose zip and send to aros android platform.'
  }]
}

// function helpTitle () {
//   print.title(config)
// }

function helpCommand () {
  print.command(config)
}

var questions = [{
  type: 'list',
  name: 'platform',
  message: 'what kind of platform you want to pack?',
  choices: [{
    name: 'ios',
    value: 'ios'
  }, {
    name: 'android',
    value: 'android'
  }, {
    name: 'all ( ios && android)',
    value: 'all'
  }]
}]

var packContainer = {
  select: select,
  all: function () {
    gulpServer.start('weex-aros:all')
  },
  ios: function () {
    gulpServer.start('weex-aros:ios')
  },
  android: function () {
    gulpServer.start('weex-aros:android')
  }
}

function select () {
  inquirer.prompt(questions).then(function (answers) {
    var platform = JSON.parse(JSON.stringify(answers)).platform
    packContainer[platform] && packContainer[platform]()
  }, (error) => {
    logger.fatal('input error'.red)
    logger.fatal(error)
  })
}

function run () {
  if (argv.h || argv.help) {
    helpCommand()
    return
  }
  if (argv.ios || argv._[1] === 'ios') {
    packContainer.ios()
  } else if (argv.android || argv._[1] === 'android') {
    packContainer.android()
  } else if (argv.all || argv._[1] === 'all') {
    packContainer.all()
  } else {
    select()
  }
}

run()
