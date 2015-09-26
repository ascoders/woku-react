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

            it("用户名存在", function* () {
                var res = yield agent.get(host + '/common/user/nickname').query({
                    nickname: 'test'
                })
                res.body.ok.should.equal(true)
            })

            it("用户名不存在", function* () {
                var res = yield agent.get(host + '/common/user/nickname').query({
                    nickname: 'test1'
                })
                res.body.ok.should.equal(false)
            })

            it("未登录状态获取不到当前用户", function* () {
                var res = yield agent.get(host + '/common/user/current')
                res.body.ok.should.equal(false)
            })

            it("获取当前登录用户", function* () {
                var res = yield agent.get(host + '/auth/login').query({
                    account: 'test',
                    password: 'abcdef'
                })
                res.body.ok.should.equal(true)

                var loginRes = yield agent.get(host + '/common/user/current')
                loginRes.body.ok.should.equal(true)
            })
        })
    })
})
