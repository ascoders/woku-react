var conf = require('../../../config/config')
var host = 'http://localhost:' + conf.web.port + '/api'

var agent = require('superagent').agent()
var userModel = require('../../../models/user/model')
var user = require('../../../models/user')

describe("controllers", function () {
    describe("auth", function () {
        describe("login", function () {
            before(function* () {
                // 创建数据表
                var sync = yield userModel.sync()

                // 插入一个用户
                var result = yield user.add({
                    nickname: 'test',
                    password: 'abcdef',
                    email: '576625322@qq.com'
                })
                result.ok.should.equal(true)
            })

            after(function* () {
                // 删除数据表
                yield userModel.drop()
            })

            it("账户名总长度校验", function* () {
                var res = yield agent.get(host + '/auth/login').query({
                    account: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    password: 'abcdef'
                })
                res.body.ok.should.equal(false)
            })

            it("昵称长度校验", function* () {
                var res = yield agent.get(host + '/auth/login').query({
                    account: 'aaaaaaaaaaa',
                    password: 'abcdef'
                })
                res.body.ok.should.equal(false)
            })

            it("邮箱校验", function* () {
                var res = yield agent.get(host + '/auth/login').query({
                    account: 'asd@qq.com',
                    password: 'abcdef'
                })
                res.body.ok.should.equal(false)
            })

            it("密码长度校验", function* () {
                var res = yield agent.get(host + '/auth/login').query({
                    password: 'abc'
                })
                res.body.ok.should.equal(false)
            })

            it("用户名登录", function* () {
                var res = yield agent.get(host + '/auth/login').query({
                    account: 'test',
                    password: 'abcdef'
                })
                res.body.ok.should.equal(true)
            })

            it("邮箱登录", function* () {
                var res = yield agent.get(host + '/auth/login').query({
                    account: '576625322@qq.com',
                    password: 'abcdef'
                })
                res.body.ok.should.equal(true)
            })

            it("登出", function* () {
                var res = yield agent.del(host + '/auth/login/logout')
                res.body.ok.should.equal(true)
            })
        })
    })
})
