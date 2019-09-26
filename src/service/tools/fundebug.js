import Vue from 'vue'
var fundebug = require('fundebug-javascript')
fundebug.apikey = '66ddd6b366a5758ccb60112b049e00e4244af581a5f149425617236919677d14'

function formatComponentName (vm) {
  if (vm.$root === vm) return 'root'
  var name = vm._isVue
    ? (vm.$options && vm.$options.name) ||
    (vm.$options && vm.$options._componentTag)
    : vm.name
  return (
    (name ? 'component <' + name + '>' : 'anonymous component') +
    (vm._isVue && vm.$options && vm.$options.__file
      ? ' at ' + (vm.$options && vm.$options.__file)
      : '')
  )
}

Vue.config.errorHandler = function (err, vm, info) {
  if (vm) {
    var componentName = formatComponentName(vm)
    var propsData = vm.$options && vm.$options.propsData
    fundebug.notifyError(err, {
      metaData: {
        componentName: componentName,
        propsData: propsData,
        info: info
      }
    })
  } else {
    fundebug.notifyError(err)
  }
}
