/*==================================================
 入口

 Copyright (c) 2015 翱翔大空 and other contributors
 ==================================================*/

var koa = require('koa')
var app = koa()

var path = require('path')
//var http = require("http")
var redisStore = require('koa-redis')
var fs = require('fs')
//var log4js = require('log4js')

var conf = require('./config/config')

// koa配置
app.name = conf.web.name
app.keys = [conf.appKeys.key, conf.appKeys.value]

// 设置session
var session = require('koa-generic-session')
app.use(session({
    store: redisStore({
        host: conf.redis.host,
        port: conf.redis.port
    })
}))

// 设置静态资源缓存
var staticCache = require('koa-static-cache')
app.use(staticCache(path.join(__dirname, conf.staticDir.path), {
    prefix: '/static',
    maxAge: conf.staticDir.maxAge,
    buffer: true,
    gzip: true,
    usePrecompiledGzip: true
}))

// 设置etag
var conditional = require('koa-conditional-get')
var etag = require('koa-etag')

app.use(conditional())
app.use(etag())

// 路由
var router = require('./config/router.js')
app.use(router.routes())
app.use(router.allowedMethods())

// 监听错误
app.on("error", function (err) {
    console.log('服务错误', err)
})

// 抓住未捕获的错误
process.on('uncaughtException', function (err) {
    console.error('未捕获错误', err)

    //打印出错误
    console.log(err)

    //打印出错误的调用栈方便调试
    console.log(err.stack)
})

// 入口文件
var templateHtml = fs.readFileSync(conf.templatePath, "utf-8")
app.use(function *() {
    this.type = 'text/html; charset=utf-8'
    this.body = templateHtml
})

module.exports = app.listen(conf.web.port)
