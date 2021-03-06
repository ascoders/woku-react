var user = require('../../../models/user')
var email = require('../../../lib/email')
var sign = require('../../../lib/sign')
var crypto = require('crypto')
var conf = require('../../../config/config')
var validator = require('validator')
var parse = require('co-body')
var registerCheck = require('../../../validate/auth/register')
var rand = require('../../../lib/rand')

exports.index = {
    // 发送注册邮件
    get: function* () {
        // 校验
        var baseCheck = registerCheck.baseCheck(this.query)
        if (!baseCheck.ok) {
            return this.body = {
                ok: false,
                data: baseCheck.data
            }
        }

        var emailCheck = registerCheck.emailCheck(this.query)
        if (!emailCheck.ok) {
            return this.body = {
                ok: false,
                data: emailCheck.data
            }
        }

        // 在session中设置注册token
        this.session.registerToken = yield rand.randomToken()

        var dataUrl = sign.create(this.session.registerToken, 60 * 60, {
            nickname: this.query.nickname,
            email: this.query.email,
            password: this.query.password,
            type: 'email'
        })

        if (!conf.test) {
            email.send({
                    to: this.query.email,
                    title: this.query.nickname + '! 请在1小时内激活账号',
                    content: '<a href="' + conf.web.domain + '/register' + dataUrl + '">点击激活</a>'
                }
            )

            return this.body = {
                ok: true
            }
        } else {
            return this.body = {
                ok: true,
                data: dataUrl
            }
        }
    },

    // 根据url注册用户
    post: function* () {
        var body = yield parse(this, {
            limit: '1kb'
        })

        // 验证url签名
        var check = sign.check(this.session.registerToken, body)
        if (!check.ok) {
            return this.body = {
                ok: false,
                data: check.data
            }
        }

        // 校验
        var baseCheck = registerCheck.baseCheck(body)
        if (!baseCheck.ok) {
            return this.body = {
                ok: false,
                data: baseCheck.data
            }
        }

        var emailCheck = registerCheck.emailCheck(body)
        if (!emailCheck.ok) {
            return this.body = {
                ok: false,
                data: emailCheck.data
            }
        }

        var result = yield user.add({
            nickname: body.nickname,
            password: body.password,
            email: body.email
        })

        if (result.ok) {
            this.session.uid = result.data.id
        }

        return this.body = result
    }
}
