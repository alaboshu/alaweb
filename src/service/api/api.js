import request from './http.js'
const baseUrlApi = 'https://pay.5ug.com'
export default {

  getNewsList: (r) => request.get('api/user/info?id=1', null, {
    baseURL: baseUrlApi
  }),
  //  Get方法：查
  // islocal==true时，先请求本地sqlite数据，如果内容存在，延时30s(页面完全打开后)，请求远程数据，同时把最新的数据保存到sqlite中
  async get () {
    request.get('api/user/info?id=1')
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })

    // var response = await request.get(apiUrl, data)
    // if (response.data.status === 1) {
    //   return response
    // } else {
    //   this.toast(response.data.message)
    // }
  },
  //  Post方法 :增
  async post (apiUrl, data) {
    var response = await request.post(apiUrl, data)
    if (response.data.status === 1) {
      return response
    } else {
      this.toast(response.data.message)
    }
  },
  //  Put方法：改
  async put (apiUrl, data) {
    var response = await request.put(apiUrl, data)
    if (response.data.status === 1) {
      return response
    } else {
      this.toast(response.data.message)
    }
  },
  //  delete方法：删
  async delete (data) {
    var response = await request.put('pay/pay', data)
    if (response.data.status === 1) {
      return response
    } else {
      this.toast(response.data.message)
    }
  }
}
