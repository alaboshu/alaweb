# ZKWeb 商城系统（移动端/小程序）

**A Vue + Mpvue Project**（一体化移动端与小程序开发）

> [Vue](https://cn.vuejs.org/) 是一套用于构建用户界面的渐进式框架。`Vue` 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，`Vue` 也完全能够为复杂的单页应用提供驱动。

> [mpvue](http://mpvue.com/) 是一个使用 `Vue.js` 开发小程序的前端框架。框架基于 `Vue.js` 核心，`mpvue` 修改了 `Vue.js` 的 runtime 和 compiler 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 `Vue.js` 开发体验。

## 简介

> [一个同时支持移动端与小程序]

## Build Setup

```bash
# install dependencies
npm install

# build mini program
npm run dev

# build H5 pages
npm run devH5

# build for production with minification for mini program
npm run build

# build for production with minification for H5 pages
npm run buildH5

# build for production and view the bundle analyzer report
npm run build --report

# eslint 检查
npm run lint

# eslint 自动修复
npm run fix
```

## 重要！！！

- 请在`project.config.json`文件,`appid`处填写自己注册的微信 appid;

## 特性

- 支持移动端 H5 `Vue.js` 构建移动端应用
- 支持微信小程序:,使用 `mpvue` 复用代码构建小程序应用
- 支持 PC 系统，使用饿了么框架
- 支持安卓 App,使用 weex 打包
- 支持苹果 App,使用 weex 打包
- 支持移微信公众号，在后端配置即可
- 系统构建流程：（Api 接口+组件）--->模块（Widget)-->页面-->流程
- 优雅的 Api 接口，包括时间戳、域名、Key、秘钥等多种方式组合加密，更安全
- 自动 Api 接口，Api 接口与 ZKCloud(asp.net core 开发)，自动同步，提高标准，压缩打包体积
- 自动生成 app.json 无需写代码
- 自动路由，新增页面路由无需代码
- 自动表单：通过 json 数据自动构建表单
- 自动表格：通过 json 数据自动构建表格
- 自动详情页：通过 json 数据，自动构建详情页
- 服务器 SSR 渲染页面，减少海量的视图工作量，压缩打包体积
- 通过视图页面，比如说一个界面 index.html?page=product/show/1,不同的 page 代表不同的页面
- 远程可视化编辑，后台修改后，无需重新发布或上架

## 插件

-
一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari 等），底层依赖轻量级的矢量图形库 ZRender，提供直观，交互丰富，可高度个性化定制的数据可视化图表。 -
一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样. 如果您曾经用过 Moment.js, 那么您已经知道如何使用 Day.js

## 截图
