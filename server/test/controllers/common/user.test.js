var conf = require('../../../config/config')
var host = 'http://localhost:' + conf.web.port

var agent = require('superagent').agent()
var userModel = require('../../../models/user/model')
var user = require('../../../models/user')

require('../../../app')

describe("controllers/common/user", function () {
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

    it("根据昵称查询", function* () {
        var res = yield agent.get(host + '/api/common/user/nickname').query({
            nickname: 'test'
        })
        res.body.ok.should.equal(true)

        var res1 = yield agent.get(host + '/api/common/user/nickname').query({
            nickname: 'test1'
        })
        res1.body.ok.should.equal(false)
    })

    it("昵称是否重复", function* () {
        var res = yield agent.get(host + '/api/common/user/nicknameUnique').query({
            nickname: 'test'
        })
        res.body.ok.should.equal(false)

        var res1 = yield agent.get(host + '/api/common/user/nicknameUnique').query({
            nickname: 'test1'
        })
        res1.body.ok.should.equal(true)
    })

    it("邮箱是否重复", function* () {
        var res = yield agent.get(host + '/api/common/user/emailUnique').query({
            email: '576625322@qq.com'
        })
        res.body.ok.should.equal(false)

        var res1 = yield agent.get(host + '/api/common/user/emailUnique').query({
            email: 'asdasd@qq.co'
        })
        res1.body.ok.should.equal(true)
    })

    it("获取当前登录的用户", function* () {
        var res = yield agent.get(host + '/api/common/user/current')
        res.body.ok.should.equal(false)

        var res1 = yield agent.get(host + '/api/auth/login').query({
            account: 'test',
            password: 'abcdef'
        })
        res1.body.ok.should.equal(true)

        var res2 = yield agent.get(host + '/api/common/user/current')
        res2.body.ok.should.equal(true)
    })
})
