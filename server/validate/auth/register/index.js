"use strict"

var validator = require('validator')

module.exports = {
    // 帐号注册基本信息校验
    baseCheck: function (data) {
        if (validator.isNull(data.nickname)) {
            return {
                ok: false,
                data: '昵称不能为空',
                code: 'nickname'
            }
        }

        if (!validator.isLength(data.nickname, 2, 10)) {
            return {
                ok: false,
                data: '昵称长度为2-10',
                code: 'nickname'
            }
        }

        if (validator.isNull(data.password)) {
            return {
                ok: false,
                data: '密码不能为空',
                code: 'password'
            }
        }

        if (!validator.isLength(data.password, 6, 30)) {
            return {
                ok: false,
                data: '密码长度为6-30',
                code: 'password'
            }
        }

        return {
            ok: true
        }
    },

    // 邮箱验证
    emailCheck: function (data) {
        if (!validator.isEmail(data.email)) {
            return {
                ok: false,
                data: '邮箱格式错误',
                code: 'email'
            }
        }

        return {
            ok: true
        }
    }
}