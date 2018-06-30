/**
* @Author: songqi
* @Date:   2016-09-13
* @Email:  songqi@benmu-health.com
* @Last modified by:   songqi
* @Last modified time: 2016-09-21
*/

module.exports = function (request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', '*')
  next()
}
