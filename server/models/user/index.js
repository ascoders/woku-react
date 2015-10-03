var model = require('./model')
var curl = require('../curl')(model)
var validator = require('validator')
var crypto = require('crypto')
var rand = require('../../lib/rand/index')

// 增
exports.add = function (info) {
    return function (done) {
        if (!validator.isNull(info.id)) {
            return done(null, {
                ok: false,
                data: '主键不能赋值'
            })
        }

        if (validator.isNull(info.nickname)) {
            return done(null, {
                ok: false,
                data: '昵称不能为空'
            })
        }

        if (validator.isNull(info.password)) {
            return done(null, {
                ok: false,
                data: '密码不能为空'
            })
        }

        if (validator.isNull(info.email)) {
            return done(null, {
                ok: false,
                data: '邮箱不能为空'
            })
        }

        if (!validator.isLength(info.password, 6, 30)) {
            return done(null, {
                ok: false,
                data: '密码长度为6-30'
            })
        }

        // 随机生成token
        crypto.randomBytes(16, function (err, buf) {
            if (err) {
                return done(null, {
                    ok: false,
                    data: 'token生成失败'
                })
            }
            info.token = buf.toString('hex')

            // 密码md5
            info.password = crypto.createHash('md5').update(info.password + info.token).digest('hex')

            // 随机生成头像
            var rangeNumber = rand.range(0, 8)
            info.portrait = rangeNumber.toString()

            // 插入
            model.create(info).then(function (result) {
                return done(null, {
                    ok: true,
                    data: result
                })
            }).catch(function (err) {
                return done(null, {
                    ok: false,
                    data: err
                })
            })
        })
    }
}

// 删
exports.del = function *(opts) {
    return yield curl.del(opts)
}

// 改
exports.update = function (info, opts) {
    return curl.update(info, opts)
}

// 查
exports.findOne = function (info) {
    return curl.findOne(info)
}

// 查多个
exports.findAll = function (info) {
    return curl.findAll(info)
}

// 查多个数据和数量
exports.findAndCountAll = function (info) {
    return curl.findAndCountAll(info)
}
