var model = require('./model')
var curl = require('../curl')(model)
var validator = require('validator')
var crypto = require('crypto')
var rand = require('../../lib/rand/index')
var loginCheck = require('../../validate/auth/login')

// 增
exports.add = function *(info) {
    // 随机生成token
    info.token = yield rand.randomToken()

    // 密码md5
    info.password = crypto.createHash('md5').update(info.password + info.token).digest('hex')

    // 随机生成头像
    var rangeNumber = rand.range(0, 8)
    info.portrait = rangeNumber.toString()

    // 插入
    return yield curl.add(info)
}

// 删
exports.del = function *(opts) {
    return yield curl.del(opts)
}

// 改
exports.update = function *(info, opts) {
    return yield curl.update(info, opts)
}

// 查
exports.findOne = function *(info) {
    return yield curl.findOne(info)
}

// 查多个
exports.findAll = function *(info) {
    return yield curl.findAll(info)
}

// 查多个数据和数量
exports.findAndCountAll = function *(info) {
    return yield curl.findAndCountAll(info)
}
