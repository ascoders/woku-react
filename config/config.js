// 敏感token
var secret = require('../secret')

// 是否在测试状态
var test = true

var myArgs = process.argv.slice(2)
myArgs.forEach(function (item) {
    switch (item) {
    case 'release': // 发布模式
        test = false
        break
    }
})

// 网站
exports.web = {
    domain: 'http://www.wokugame.com',
    name: 'woku',
    port: 8080
}

// Cookie 签名密钥
exports.appKeys = {
    key: "wokuSecret",
    value: "$x+9-p=rSc[*7X(tgq3K3TpqQ3Wvu@"
}

// 静态目录
exports.staticDir = {
    path: 'static',
    maxAge: 365 * 24 * 60 * 60
}

// 总模版文件
exports.templatePath = 'src/main.html'

// 数据库
exports.db = {
    name: test ? 'woku_test' : 'woku',
    user: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql'
}

// 邮件
exports.email = {
    from: '我酷科技<server@wokugame.com>',
    host: 'smtp.wokugame.com',
    port: 587,
    user: 'server@wokugame.com',
    password: secret.email.password
}

// redis
exports.redis = {
    port: 6379,
    host: '127.0.0.1'
}

// 调试模式
exports.debug = true

// 是否在测试环境
exports.test = test
