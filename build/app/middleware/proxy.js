/**
 * @Author: songqi
 * @Date:   2016-07-15
 * @Email:  songqi@benmu-health.com
 * @Last modified by:   songqi
 * @Last modified time: 2016-11-10
 */

var fs = require('fs')
var url = require('url')
var _ = require('lodash')
var path = require('path')
var http = require('http')
var https = require('https')
var readConfig = require('../utils/readConfig')

function proxyRequest (request, response, next) {
  var target = request.target ? request.target + '/' : ''
  if (request.client.ssl) {
    let options = url.parse('https://' + target + request.url.slice(1))
    options['rejectUnauthorized'] = false
    https.request(options, function (remoteRequest) {
      if (remoteRequest.statusCode === 200) {
        response.setHeader('Content-Type', remoteRequest.headers['content-type'])
        remoteRequest.pipe(response)
      } else {
        response.writeHead(remoteRequest.statusCode)
        response.end()
      }
    }).on('error', function (e) {
      next()
    }).end()
  } else {
    let options = url.parse('http://' + target + request.url.slice(1))
    http.request(options, function (remoteRequest) {
      if (remoteRequest.statusCode === 200) {
        response.setHeader('Content-Type', remoteRequest.headers['content-type'])
        remoteRequest.pipe(response)
      } else {
        response.writeHead(remoteRequest.statusCode)
        response.end()
      }
    }).on('error', function (e) {
      next()
    }).end()
  }
};

function testProxy (request, proxyConfig) {
  if (request.url.slice(0, proxyConfig.route.length) === proxyConfig.route) {
    request.url = request.url.slice(proxyConfig.route.length)
    proxyConfig.target && (request.target = proxyConfig.target)
    return request
  } else {
    return false
  }
}

function Proxy (options) {
  var config = _.assign({
    root: path.join(process.cwd(), '../'),
    proxy: ''
  }, { proxy: readConfig.get('proxy') })
  return function (request, response, next) {
    if ((!config.proxy || _.isArray(config.proxy)) && !config.proxy.length) {
      next()
      return
    }

    if (typeof config.root === 'string') {
      config.root = [config.root]
    } else if (!_.isArray(config.root)) {
      throw new Error('No root specified')
    }

    var pathChecks = []
    config.root.forEach(function (root, i) {
      var _isProxy = false
      var _proxy = false
      var p = path.resolve(root) + request.url
      fs.access(p, function (err) {
        pathChecks.push(!err)
        if (config.root.length === ++i) {
          var pathExists = pathChecks.some(function (p) {
            return p
          })
          if (pathExists) {
            next()
          } else {
            if (_.isArray(config.proxy)) {
              _isProxy = config.proxy.some(function (item) {
                _proxy = testProxy(request, item)
                if (_proxy) {
                  proxyRequest(_proxy, response, next)
                  return true
                }
              })
              if (!_isProxy) {
                next()
              }
            } else if (config.proxy && config.proxy.route) {
              _proxy = testProxy(request, config.proxy)
              if (_proxy) {
                proxyRequest(_proxy, response, next)
              } else {
                next()
              }
            } else {
              next()
            }
          }
        }
      })
    })
  }
}

module.exports = Proxy
