var user = require('../../../models/user')
var crypto = require('crypto')
var validator = require('validator')

// 用户登陆
exports.index = {
    get: function* () {
        // 用户信息
        var result = {}

        if (!validator.isEmail(this.query.account)) { // 不是邮箱
            if (!validator.isLength(this.query.account, 2, 10)) {
                return this.body = {
                    ok: false,
                    data: '昵称长度为2-10'
                }
            }

            // 根据昵称查找用户
            result = yield user.findOne({
                where: {
                    nickname: this.query.account
                }
            })
        } else {
            // 根据邮箱查找用户
            result = yield user.findOne({
                where: {
                    email: this.query.account
                }
            })
        }

        // 用户不存在
        if (!result.ok) {
            return this.body = {
                ok: false,
                data: '用户不存在',
                code: 'account'
            }
        }

        // 密码不正确
        if (crypto.createHash('md5').update(this.query.password + result.data.token).digest('hex') !== result.data.password) {
            return this.body = {
                ok: false,
                data: '密码错误',
                code: 'password'
            }
        }

        // 为用户设置session
        this.session.uid = result.data.id

        return this.body = {
            ok: true,
            data: result.data
        }
    }
}

// 登出
exports.logout = {
    del: function* () {
        if (validator.isNull(this.session.uid)) {
            return this.body = {
                ok: false,
                data: '未登录'
            }
        }

        this.session.uid = null
        return this.body = {
            ok: true
        }
    }
}

