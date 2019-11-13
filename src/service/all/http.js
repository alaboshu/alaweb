/* eslint-disable */
// eslint-disable-next-line
import token from "@/service/all/token";
import api from "@/service/api";
import user from "@/service/user";
import globalConfig from "@/service/config";
import axios from 'axios'

export default {
  async get(apiUrl, data) {
    this.getAxios(apiUrl)
    var response = await axios.get(globalConfig.apiBaseUrl + apiUrl, {
      params: data
    });
    return response.data;
  },
  async post(apiUrl, data) {
    this.getAxios(apiUrl)
    var response = await axios.post(globalConfig.apiBaseUrl + apiUrl, data)
    return response.data;
  },
  //  Put方法：改
  async put(apiUrl, data) {
    var response = await this.getRequest(apiUrl).put(apiUrl, data);
    return response;
  },
  getAxios(apiUrl) {
    axios.interceptors.request.use((config) => {
      config.headers = {
        ...config.headers,
        ...this.getHead(apiUrl)
      }
      return config
    })
  },
  getHead(apiUrl) {
    var headObj = {
      "zk-token": token.getToken(apiUrl),
      "zk-user-id": user.id(),
      "zk-user-token": token.getUserToken(apiUrl),
      "zk-tenant": api.tenant(),
      "zk-timestamp": token.timestamp()
    };
    return headObj;
  }
};
