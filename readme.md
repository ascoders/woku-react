# 我酷科技 web

## 特性

- all in js
- 自动化构建
- 自动化测试
- 前端路由，与后端分离
- 开发构建时，前端页面自动刷新，后端服务自动重启
- 后端首屏渲染（还在实验状态）
- 前端组件化
- 前后端复用一套代码
- 后端generator特性摆脱回调地狱

## 技术栈

构建：webpack babel react-hot-loader

前端：react flux antd

后端：koa mysql redis

测试：mocha istanbul

额外：css-inline server-render

暂不：class import

## install for MAC

```shell
brew install redis
brew install mysql
```

## install for Windows
手动安装 redis mysql 服务

## Run

### 开发
```shell
# 安装依赖
npm install

# 构建
npm run build
```

### 服务器部署
```shell
# 安装依赖
npm install

# 运行
npm run release

# 终止运行
npm run clean
```

### 测试
```shell
# 测试&覆盖率
npm run test
~~~

开发环境默认端口`8080`，生产环境默认端口`80`

开发环境的热编译资源端口默认为`9090`

## 主要项目结构

~~~js
client  // 客户端
|---- component     // 组件
|---- lib           // 库文件
|---- mixin         // mixin
|---- src           // 业务
|---- test          // 测试
|---- static        // 前端代码打包目录
|---- html.js       // html模板
|---- router.js     // 路由
|---- main.js       // 入口
server  // 服务端
|---- config        // 配置
|---- controllers   // 控制器
|---- models        // 模型
|---- lib           // 库文件
|---- render        // 服务端渲染
|---- validate      // 校验
|---- test          // 测试
|---- ruoter.js     // 路由
|---- app.js        // 入口
~~~