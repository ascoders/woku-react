# 我酷官网

## 技术栈

构建：webpack babel react-hot-loader

前端：react flux antd

后端：koa mysql redis

测试：mocha blanket

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
npm start

# 测试
npm test

# 生产环境运行
npm run dist

# 终止生产环境运行
npm run clear
```

开发环境默认端口`8080`，生产环境默认端口`80`

开发环境的热编译资源端口默认为`9090`