# ZKWeb 商城系统（移动端/小程序）

## 想解决的痛点

> 没有重复造轮子，其目的是为了更好的服务公司的商业项目，同时我们也希望能够帮助到您的商业项目。随带开源，我们主要借鉴 **Vux** 的形态并以此为基础，参考 Ratchet、Ionic、Onsen 各种不同的思路，强化功能，精简体积。此外还定制增强了一些工具类开源库。

同时 ZKUI 也是一款成长中的框架，大量吸收借鉴了一些优化前端工具以及框架的设计理念和思想。如果 ZKUI 有不足地方，或者你有更好的想法，欢迎提交 ISSUE 或者 PR。

## 特别感谢

- [F-loat](https://github.com/F-loat)  [mpvue-entry](https://github.com/F-loat/mpvue-entry)、 [mpvue-wxParse](https://github.com/F-loat/mpvue-wxParse)的作者，mpvue的资深开拓者

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

## 特性

- 支持移动端 H5 `Vue.js` 构建移动端应用
- 支持微信小程序:,使用 `mpvue` 复用代码构建小程序应用
- 支持 PC 系统，使用饿了么框架
- 支持安卓 App,使用 weex 打包
- 支持苹果 App,使用 weex 打包
- 支持移微信公众号，在后端配置即可
- 约定大于配置：尽可能的让业务实现代码最小化
- 引用不强依赖：彻底的组件化开发能力,尽可能的复用代码
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
一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari 等）

## 截图

## 重要

- 请在`project.config.json`文件,`appid`处填写自己注册的微信 appid;
