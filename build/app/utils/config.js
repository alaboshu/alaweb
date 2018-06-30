/**
 * Created by godsong on 16/10/12.
 */
const Fs = require('fs')
const Path = require('path')
const Inquirer = require('inquirer')
class Config {
  constructor (properties, path) {
    this.path = path
    if (properties instanceof ConfigResolver) {
      let map = {}
      this.properties = []
      for (let key in properties.def) {
        for (let propName in properties.def[key]) {
          if (!map[propName]) {
            this.properties.push({
              name: propName,
              desc: properties.def[key].desc || 'enter your ' + propName + ':'
            })
            map[propName] = true
          }
        }
      }
    } else {
      this.properties = properties.split(',').map(prop => {
        var splits = prop.split('|')
        return {
          name: splits[0],
          desc: splits[1] || 'enter your ' + splits[0] + ':'
        }
      })
    }
  }

  getConfig () {
    return new Promise((resolve, reject) => {
      let config = {}
      try {
        config = require(this.path)
      } catch (e) {
      }
      var questions = []
      var answers = {}
      console.log('============build config============')
      this.properties.forEach(function (prop) {
        if (config[prop.name] !== undefined && config[prop.name] !== '') {
          answers[prop.name] = config[prop.name]
          console.log(prop.name + '=>' + answers[prop.name])
        } else {
          questions.push({
            type: 'input',
            message: prop.desc,
            name: prop.name
          })
        }
      })
      if (questions.length > 0) {
        Inquirer.prompt(questions)
          .then((answers) => {
            Object.assign(config, answers)
            Fs.writeFileSync(this.path, JSON.stringify(config, null, 4))
            resolve(config)
          })
      } else {
        console.log('if you want to change build config.please modify ' + Path.basename(this.path))
        resolve(config)
      }
    })
  }
}
class ConfigResolver {
  constructor (def) {
    this.def = def
  }

  resolve (config, basePath) {
    basePath = basePath || process.cwd()
    for (let path in this.def) {
      if (this.def.hasOwnProperty(path)) {
        let targetPath = Path.join(basePath, path)
        let source = Fs.readFileSync(targetPath).toString()
        for (let key in this.def[path]) {
          if (this.def[path].hasOwnProperty(key)) {
            let configDef = this.def[path][key]
            if (Array.isArray(configDef)) {
              configDef.forEach((def) => {
                source = _resolveConfigDef(source, def, config, key)
              })
            } else {
              source = _resolveConfigDef(source, configDef, config, key)
            }
          }
        }
        Fs.writeFileSync(targetPath, source)
      }
    }
  }
}
function _resolveConfigDef (source, configDef, config, key) {
  if (configDef.type) {
    if (config[key] === undefined) {
      throw new Error('Config:[' + key + '] must have a value!')
    }
    return replacer[configDef.type](source, configDef.key, config[key])
  } else {
    return configDef.handler(source, config[key], replacer)
  }
}
const replacer = {
  plist (source, key, value) {
    /* eslint-disable */
    let r = new RegExp('(<key>' + key + '</key>\\s*<string>)[^<>]*?<\/string>', 'g')
    return source.replace(r, '$1' + value + '</string>')
  },
  xmlTag (source, key, value, tagName = 'string') {
    let r = new RegExp(`<${tagName} name="${key}">[^<]+?</${tagName}>`, 'g')
    return source.replace(r, `<${tagName} name="${key}">${value}</${tagName}>`)
  },
  xmlAttr (source, key, value, tagName = 'string') {
    let r = new RegExp(`<${tagName} name="${key}"\\s* value="[^"]*?"\\s*/>`, 'g')
    return source.replace(r, `<${tagName} name="${key}" value="${value}"/>`)
  },
  regexp (source, regexp, value) {
    return source.replace(regexp, function (m, a, b) {
      return a + value + (b || '')
    })
  }
}

exports.Config = Config
exports.ConfigResolver = ConfigResolver
exports.androidConfigResolver = new ConfigResolver({
  'build.gradle': {
    AppId: {
      type: 'regexp',
      key: /(applicationId ")[^"]*(")/g
    }
  },
  'app/src/main/res/values/strings.xml': {
    AppName: {
      type: 'xmlTag',
      key: 'app_name'
    },
    SplashText: {
      type: 'xmlTag',
      key: 'dummy_content'
    }
  },
  'app/src/main/res/xml/app_config.xml': {
    WeexBundle: {
      handler: function (source, value, replacer) {
        if (/https?/.test(value)) {
          source = replacer.xmlAttr(source, 'launch_locally', 'false', 'preference')
          return replacer.xmlAttr(source, 'launch_url', value, 'preference')
        } else {
          source = replacer.xmlAttr(source, 'launch_locally', 'true', 'preference')
          let name = value.replace(/\.(we|vue)$/, '.js')
          // Fs.writeFileSync(Path.join(process.cwd(), 'app/src/main/assets/'+name),Fs.readFileSync(Path.join(process.cwd(), '../../dist', name)));

          return replacer.xmlAttr(source, 'local_url', 'file://assets/dist/' + name, 'preference')
        }
      }
    }
  }

})
exports.iOSConfigResolver = new ConfigResolver({
  'WeexDemo/WeexDemo-Info.plist': {
    AppName: {
      type: 'plist',
      key: 'CFBundleDisplayName'
    },
    Version: {
      type: 'plist',
      key: 'CFBundleShortVersionString'
    },
    BuildVersion: {
      type: 'plist',
      key: 'CFBundleVersion'
    },
    AppId: {
      type: 'plist',
      key: 'CFBundleIdentifier'
    }

  },
  'WeexDemo.xcodeproj/project.pbxproj': {
    CodeSign: [{
      type: 'regexp',
      key: /("?CODE_SIGN_IDENTITY(?:\[sdk=iphoneos\*])?"?\s*=\s*").*?(")/g
    }, {
      type: 'plist',
      key: 'CODE_SIGN_IDENTITY(\\[sdk=iphoneos\\*])?'
    }
    ],
    Profile: [
      {
        type: 'regexp',
        key: /(PROVISIONING_PROFILE\s*=\s*")[^"]*?(")/g
      },
      {
        type: 'plist',
        key: 'PROVISIONING_PROFILE'
      }
    ]
  }

})
