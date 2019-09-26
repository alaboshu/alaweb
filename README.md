## install dependencies

npm install
yarn install
npm install -g yarn

## 发布流程

5ug publish all
5ug init
npm run build

### 开发强调非常非常重要

- x-icon 用法:优先级 icon,name,src
- 多余的 console.info()删掉

## 运行

- 运行 h5：npm run dev
- 运行小程序: npm run dev:mp

## 安卓离线构建

- 使用 HBuilderX 构建离线资源
- 复制 src/unpackage/resources/**UNI**FED8DFC 到 native/android/app/src/main/assets/apps/ 下
- 使用 Android Studio 打包安装文件

## 开发注意点

- 分析 html 结构，减少 html 嵌套
- 在组件中尽量的少定义变量，特别时 data，能少一个是一个
- 变量名不能使用拼音，使用英文，更不能缩写
- 不能使用本地图片，所有的图片配合可视化编辑来处理，使用远程图片,否则小程序 100%体积超过
- 所有的 data 数据，模拟数据第一选择使用 diy 构建自动表单，第二选择使用 data.json 数据
- 不能使用 window.location 进行跳转，而是使用 this.\$api.to()
- 不能用中文，用 id，等特殊字符来做判断
- 精通 uti-app 的配置、组件、接口、规范等https://uniapp.dcloud.io/component/README
- 不能在页面上做过多的开发
- css 背景，尽可能的不用图片，使用样式来处理
- 页面结构有服务端 DIY 平台定义，有组件组成
- 组件 components（所有平台共用、接口、数据格式统一）
- 元件 elements (各平台独立写)
- 精通https://github.com/dcloudio/hello-uniapp 所有的目录结构
- 精通文章：https://ask.dcloud.net.cn/article/35232
- 优先调试小程序
- div 使用 view

## 以达优的组件

- 图标（x-icon) ,支持小程序、H5。可加载图片、svg 图标、远程图片以及远程图标

## 5ug-cli 命令使用

- 全局安装 npm install 5ug-cli -g

### 登录：5ug login

-输入用户名，密码，选择项目

### 创建组件：5ug create <name>

-例如： 5ug create test/zk-test 创建组件 其中 test/zk-test 为组件路径和格式

### 发布组件：5ug publish <name>

- 功能：1.发布源文件 2.发布风格 3.版本统计
- 例如：5ug publish test/zk-test 创建组件 其中 test/zk-test 为组件路径和格式

### 发布所有组件：5ug publish all

### 构建 main.js 5ug main

- 遍历当前项目中 src/components src/elements src/admins 三个目录，自动生成 main.js
- 只支持二级目录，不支持一级目录和三级目录

## 创建模块流程

### 第一步 创建组件：5ug create <name>

- 本地生成模板文件，包括 vue,js,scss 等文件
- 5ug publish all 发布所有组件

### 第二步 发布组件：5ug publish <name>

- 在服务器中创建组件，包括风格、样式、版本等

### 第三步 同步表单

- 在/operation/init 点击数据处理

### 第四步 模块添加

- 在/widget/edit 添加模块

### 第五步 编辑表单

- 使用正确的数据格式

### 第六步 前端调试

- 发布最新的数据格式
