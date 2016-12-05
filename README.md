# universal-react-seed

### 技术架构

采用同构React模式 + webpack进行开发

同构框架：
React + React-Router + Redux + Express(MVC)

开发环境框架：
webpack-dev-middleware
webpack-hot-moudle-middleware
koa
gulp
gulp-nodemon
webpack

打包工具：
webpack

主要插件：
superagent
bluebird
immutabel
loadsh

### 安装软件

- Node.js：v6.0+

### 安装依赖模块

``` bash
$ npm install
```

### 本地开发环境

- 启动本地开发服务器

    ``` bash
    $ npm run dev
    ```

### 业务开发

##### 目录结构

``` js
.
├── .babelrc                       # Babel规则
├── gulpfile.js                    # gulp任务配置
├── npm-shrinkwrap.json            # 包依赖关系管理
├── package.json                   # 项目配置
├── Procfile                       # 项目正式环境命令
├── README.md                      # 项目说明
├── app                            # 客户端文件
│   ├── actions                    # Redux action
│   ├── assets                     # 项目静态资产（图片、字体、flash)
│   ├── components                 # 项目公用组件
│   │   ├── images                 # 组件依赖图片
│   │   ├── __unit__.js            # 组件单元测试入口文件
│   │   ├── view.less              # 组件依赖样式
│   │   └── index.js               # 组件文件（JSX）
│   ├── config                     # 客户端配置文件（未使用待定）
│   ├── middleware                 # Redux 中间件
│   ├── reducers                   # Redux reducer
│   ├── routes                     # React 动态路由
│   │   ├── components             # 路由关联的展示组件（文件结构同公用组件）
│   │   ├── container              # 路由关联的容器组件（文件结构同公用组件）
│   │   ├── routes                 # 动态路由的子路由
│   │   │   ├── ...                # 重复上层结构   
│   │   └── index.js               # 路由文件
│   ├── store                      # Redux stroe
│   ├── styles                     # 项目公用样式
│   └── app.js                     # 客户端入口文件
├── configs                        # 项目配置
│   ├── environments               # 环境配置
│   │   ├── dependencies.js        # 项目依赖
│   │   └── index.js               # 项目环境变量
│   ├── karam                      # 单元测试配置文件
│   ├── webpack                    # webpack配置文件
│   │   ├── common.config.js       # webpack公用配置
│   │   ├── development.config.js  # webpack开发环境配置
│   │   ├── production.config.js   # webpack生产环境配置
│   │   ├── server.config.js       # webpack服务器配置
│   └── webpack-dev                # webpack开发服务器配置
├── dist                           # 编译后生成的文件
└── server                         # 服务器端文件
    ├── controllers                # 服务器controller
    ├── dev                        # 开发环境服务器文件
    │   ├── components.dev.js      # 组件单元测试路由
    │   └── webpack.server.js      # webpack开发服务器执行文件
    ├── middlewares                # 服务器中间件
    ├── proxy                      # 请求代理
    ├── views                      # 服务器视图
    │   ├── component-unit.html    # 组件单元测试模板（webpack打包用）
    │   ├── index.ejs              # 客户端主页面模板
    │   └── unit.ejs               # 组件单元测试模板（Express渲染）
    ├── api_router.js              # 数据接口路由
    ├── mock_api.js                # 模拟数据文件
    └── server.js                  # 服务器端执行文件（webpack打包入口）
```
