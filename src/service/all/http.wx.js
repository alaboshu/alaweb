/* eslint-disable */
// eslint-disable-next-line
import token from "@/service/all/token";
import h5Fly from "flyio";
import Fly from "flyio/dist/npm/wx";
import api from "@/service/api";
import user from "@/service/user";
import globalConfig from "@/service/config";
import axios from "wx-axios-promise";

export default {
  async get(apiUrl, data) {
    var axiosWx = axios()
    this.getAxios(apiUrl);
    var response = await axiosWx.get(globalConfig.apiBaseUrl + apiUrl, {
      params: data
    });
    return response.data;
  },
  async post(apiUrl, data) {
    this.getAxios(apiUrl);
    var axiosWx = axios()
    var response = await axiosWx.post(globalConfig.apiBaseUrl + apiUrl, data);
    return response.data;
  },
  //  Put方法：改
  async put(apiUrl, data) {
    var response = await this.getRequest(apiUrl).put(apiUrl, data);
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
  },
  getAxios(apiUrl) {
    var axiosWx = axios()
    axiosWx.interceptors.request.use(config => {
      console.info("config", config);
      config.headers = {
        ...config.headers,
        ...this.getHead(apiUrl)
      };
      return config;
    });
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
