## 文房四宝-企业全渠道数据中台

文房四宝是一款针对企业的数据中台管理系统，可采用云端部SAAS模式和私有化方式部署，拥有大型云服务集群，可轻松应对大流量、高并发的复杂数字化云计算场景，多平台人、财、物数字化统一管理，帮助企业轻松实现数字化转型。

##  开源、免费
- 后台应用程序 https://github.com/zhongku/alabo
- 移动端：多网合一前端 https://github.com/zhongku/alaweb
- PC管理后台与PC前端 https://github.com/alaboshu/alapc
## 联系方式
 - QQ群：215176974
## 一套 Vue 代码， 支持 H5、小程序、安卓 App、苹果 App

![图片](https://raw.githubusercontent.com/zhongku/alaweb/weex-branch/src/assets/img/github/banner.png)

> （High quality Weex、MpVue）

## 后台 DIY 系统，所见即所得、最大程度的复用代码

![图片](https://github.com/zhongku/alaweb/blob/weex-branch/src/assets/img/github/diy.jpg)


## 想解决的痛点

* 维护一套代码，同时维护 H5、小程序、安卓 App、苹果 App 减少代码负债
* 用 vue.js 开发，支持多个终端
* 通过可视化编辑，让客户个性化 DIY 各个终端
* 开发同一份代码，可以在不同的端上分别执行，避免了多端的重复研发成本
* 使用同一种开发体验，包括语法设计和工程链路等,减低人员培训成本
* 同一套组件：设计基于小程序、 iOS、Android、H5、PC，有一定的通用性和普遍性

## Build Setup

```bash
# install dependencies
npm install


# build mini program
npm run dev:min

# build H5 pages
npm run dev

# build for production with minification for mini program
npm run build:min

# build for production with minification for H5 pages
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# eslint 检查
npm run lint

# eslint 自动修复
npm run fix

# build app pages, run debug service
npm run dev:app

# 打包app js包到android和ios工程
npm run pack:app
```

## 特性

* 支持移动端 H5 `Vue.js` 构建移动端应用
* 支持微信小程序:,使用 `mpvue` 复用代码构建小程序应用
* 支持 PC 系统，使用饿了么框架
* 支持安卓 App,使用 weex 打包
* 支持苹果 App,使用 weex 打包
* 支持移微信公众号，在后端配置即可
* 约定大于配置：尽可能的让业务实现代码最小化
* 引用不强依赖：彻底的组件化开发能力,尽可能的复用代码
* 系统构建流程：（Api 接口+组件）--->模块（Widget)-->页面-->流程
* 优雅的 Api 接口，包括时间戳、域名、Key、秘钥等多种方式组合加密，更安全
* 自动 Api 接口，Api 接口与 ZKCloud(asp.net core 开发)，自动同步，提高标准，压缩打包体积
* 自动生成 app.json 无需写代码
* 自动路由，新增页面路由无需代码
* 自动表单：通过 json 数据自动构建表单
* 自动表格：通过 json 数据自动构建表格
* 自动详情页：通过 json 数据，自动构建详情页
* 服务器 SSR 渲染页面，减少海量的视图工作量，压缩打包体积，动态渲染页面
* 通过视图页面，比如说一个界面 index.html?page=product/show/1,不同的 page 代表不同的页面
* 远程可视化编辑，后台修改后，无需重新发布或上架

## 组件(components)

* 轮播(zk-swiper),已支持小程序、h5
* 图标导航(zk-grid),已支持小程序、h5
* 轮播(zk-swiper),已支持小程序、h5

## 元件(elements)

* 图标（x-icon) ,支持小程序、H5。可加载图片、svg 图标、远程图片以及远程图标
* 图标导航(zk-grid),已支持小程序、h5
* x-verifiy-phone

一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari 等）

## 后台部分预览图
![图片](https://coding-net-production-file-ci.codehub.cn/19cff000-ea28-11e9-a571-e756f4542f5b.png?sign=PN2zxwimhqkQk4sfRqaYK254BsZhPTEyNTcyNDI1OTkmaz1BS0lEYXk4M2xGbWFTNlk0TFRkek1WTzFTZFpPeUpTTk9ZcHImZT0xNTcwNzk1Mzk5JnQ9MTU3MDU3OTM5OSZyPTE5ODE3NDk0JmY9LzE5Y2ZmMDAwLWVhMjgtMTFlOS1hNTcxLWU3NTZmNDU0MmY1Yi5wbmcmYj1jb2RpbmctbmV0LXByb2R1Y3Rpb24tZmlsZQ==)
![图片](https://coding-net-production-file-ci.codehub.cn/01ba78a0-ea28-11e9-a571-e756f4542f5b.png?sign=SmeJzEZrtSt4lPDN+4TAKPdyu9lhPTEyNTcyNDI1OTkmaz1BS0lEYXk4M2xGbWFTNlk0TFRkek1WTzFTZFpPeUpTTk9ZcHImZT0xNTcwNzk1MzYwJnQ9MTU3MDU3OTM2MCZyPTczNTM0MjgyJmY9LzAxYmE3OGEwLWVhMjgtMTFlOS1hNTcxLWU3NTZmNDU0MmY1Yi5wbmcmYj1jb2RpbmctbmV0LXByb2R1Y3Rpb24tZmlsZQ==)

* 期待您的加入,交流 QQ 群：215176974