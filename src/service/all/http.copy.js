/* eslint-disable */
// eslint-disable-next-line
import token from "@/service/all/token";
import h5Fly from "flyio";
import Fly from "flyio/dist/npm/wx";
import api from "@/service/api";
import base from "@/service/base";
import user from "@/service/user";
import globalConfig from "@/service/config";

export default {
  //  Get方法：查
  async get(apiUrl, data) {
    const timer = api.loadingOpen(350);
    const response = await this.getRequest(apiUrl, data).get(apiUrl, data);
    api.loadingClose(timer);
    return response;
  },
  //  Post方法 :增
  async post(apiUrl, data) {
    var response = await this.getRequest(apiUrl, data).post(apiUrl, data);
    return response;
  },
  //  Put方法：改
  async put(apiUrl, data) {
    var response = await this.getRequest(apiUrl).put(apiUrl, data);
    return response;
  },
  //  delete方法：删
  async delete(apiUrl, data) {
    var response = await this.getRequest(apiUrl).delete(api, data);
    return response;
  },
  getClientRequest() {
    var request;
    if (api.client() === "WapH5") {
      request = h5Fly;
      return request;
    } else if (api.client() === "WeChat") {
      request = Fly;
      return request;
    } else if (api.client() === "WeChatLite") {
      request = new Fly();
      return request;
    }
  },
  getRequest(apiUrl) {
    const request = new Fly();
    var userId = user.id();
    request.interceptors.request.use((config, promise) => {
      config.headers["zk-token"] = token.getToken(apiUrl);
      config.headers["zk-user-id"] = userId;
      config.headers["zk-user-token"] = token.getUserToken(apiUrl);
      config.headers["zk-tenant"] = api.tenant();
      config.headers["zk-timestamp"] = token.timestamp(); 
      return config;
    });
    request.config.baseURL = globalConfig.apiBaseUrl;
    if (base.isDiy()) {
      var clientHost = api.vuexGet("diyClientHost");
      if (clientHost !== undefined) {
        config.headers["zk-diy-token"] = token.getDiyToken(apiUrl);
        request.config.baseURL = clientHost;
      }
    }
    request.interceptors.response.use(
      (response, promise) => {
        var result = promise.resolve(response.data);
        return result;
      },
      (err, promise) => {
        if (err) {
          if (!base.isBuild()) {
            console.error(`网络请求错误:${apiUrl},`, err.response);
          }
        }
        return promise.resolve(err.response.data);
      }
    );
    return request;
  }
};
