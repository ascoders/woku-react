# 我酷科技

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

```shell
# 安装依赖
npm install

# 开发构建
npm run build

# 测试&覆盖率
npm run test

# 生产环境运行
npm run release

# 终止生产环境运行
npm run clean
```

开发环境默认端口`8080`，生产环境默认端口`80`

开发环境的热编译资源端口默认为`9090`

## 项目结构

~~~js
client // 客户端
|---- component // 组件
|---- lib       // 库文件
|---- mixin     // mixin
|---- src       // 业务
|---- test      // 测试
|---- html.js   // html模板
|---- router.js // 路由
|---- main.js   // 入口

server // 服务端
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