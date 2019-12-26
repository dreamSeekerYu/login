# umktw

### 营销平台的H5前端服务

## Project setup

```
yarn install

yarn serve

yarn build
```

## 目录结构

```
├── vue.config.js                 webpack配置文件
├── node_modules                  依赖
├── src                           代码编写的目录
│   ├── assets                    资源文件夹
│   ├── components                组件文件夹（非完整页面）
│   ├── pages                     页面文件夹（完整页面）
│   ├── plugins                   插件文件夹
│   ├── theme                     样式文件夹
│   ├── api                       接口定义
│   ├── router                    路由文件夹
│   ├── utils                     工具函数文件夹
│   ├── store                     全局状态处理
│   ├── App.vue                   根组件
│   └── main.js                   入口文件
├── target/umktw                  编译输出目录
├── babel.config.js               babel 配置文件
└── package.json                  package 配置(包含eslint配置)
```

### 引入的模块

##### 全局的状态存储 [vuex]()

##### 路由管理 [vue-router]()

##### 微信 jsSDK [script](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#3)

##### 图片懒加载 [vue-lazyload-img]()

##### 移动端页面调试工具[vconsole]()

##### banner 图插件[vue-awesome-swiper]()

##### 城市选择 [vue-city]()

##### 转换 base64 格式 [vue-file-base64]()

##### 谷歌地图插件 [vue-google-maps]()
