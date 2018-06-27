import http from 'src/service/common/http'

export default {
  //  Get方法：查
  async get (apiUrl, data) {
    var response = await http.get('pay/GetList', data)
    return response
  },
  //  Post方法 :增
  async post (apiUrl, data) {
    var response = await http.post(apiUrl, data)
    if (response.data.status === 1) {
      return response
    } else {
      alert(response.data.message)
    }
  },
  //  Put方法：改
  async put (data) {
    var response = await http.put('pay/pay', data)
    return response
  },
  //  delete方法：删
  async delete (data) {
    var response = await http.put('pay/pay', data)
    return response
  }
}
