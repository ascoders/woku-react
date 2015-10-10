var conf = require('../../../config/config')
var host = 'http://localhost:' + conf.web.port + '/api'
var url = require('url')
var userModel = require('../../../models/user/model')
var agent = require('superagent').agent()

require('../../../app')

describe("controllers/auth/register", function () {
    before(function* () {
        // 创建数据表
        yield userModel.sync()
    })

    after(function* () {
        // 删除数据表
        yield userModel.drop()
    })

    it("昵称不能为空", function* () {
        var res = yield agent.get(host + '/auth/register').query({
            password: 'abcdef',
            email: '576625322@qq.com'
        })
        res.body.ok.should.equal(false)
    })

    it("密码不能为空", function* () {
        var res = yield agent.get(host + '/auth/register').query({
            nickname: 'test',
            email: '576625322@qq.com'
        })
        res.body.ok.should.equal(false)
    })

    it("密码长度大于6", function* () {
        var res = yield agent.get(host + '/auth/register').query({
            nickname: 'test',
            password: 'abcde',
            email: '576625322@qq.com'
        })
        res.body.ok.should.equal(false)
    })

    it("密码长度小于30", function* () {
        var res = yield agent.get(host + '/auth/register').query({
            nickname: 'test',
            password: 'abcdeabcdeabcdeabcdeabcdeabcdea',
            email: '576625322@qq.com'
        })
        res.body.ok.should.equal(false)
    })

    it("邮箱不能为空", function* () {
        var res = yield agent.get(host + '/auth/register').query({
            nickname: 'test',
            password: 'abcdef'
        })
        res.body.ok.should.equal(false)
    })

    it("邮箱格式校验", function* () {
        var res = yield agent.get(host + '/auth/register').query({
            nickname: 'test',
            password: 'abcdef',
            email: '576625322qq.com'
        })
        res.body.ok.should.equal(false)
    })

    it("注册邮件发送成功", function* () {
        var res = yield agent.get(host + '/auth/register').query({
            nickname: 'test',
            password: 'abcdef',
            email: '576625322@qq.com'
        })
        res.body.ok.should.equal(true)
    })

    it("根据邮件内容注册", function* () {
        var res = yield agent.get(host + '/auth/register').query({
            nickname: 'test',
            password: 'abcdef',
            email: '576625322@qq.com'
        })
        res.body.ok.should.equal(true)
        if (!res.body.ok) {
            return;
        }

        // url转化为参数
        var params = url.parse(res.body.data, true)
        var res1 = yield agent.post(host + '/auth/register').send(params.query)
        res1.body.ok.should.equal(true)
    })

    it("注册签名验证", function* () {
        var res = yield agent.get(host + '/auth/register').query({
            nickname: 'test',
            password: 'abcdef',
            email: '576625322@qq.com'
        })
        res.body.ok.should.equal(true)
        if (!res.body.ok) {
            return;
        }

        // url转化为参数
        var params = url.parse(res.body.data, true)
        params.query.sign = ''
        var res1 = yield agent.post(host + '/auth/register').send(params.query)
        res1.body.ok.should.equal(false)
    })

    it("注册输入校验", function* () {
        // 签名限制，没法伪造错误的信息
        var res = yield agent.get(host + '/auth/register').query({
            nickname: 'test',
            password: 'abcdef',
            email: '576625322@qq.com'
        })
        res.body.ok.should.equal(true)
        if (!res.body.ok) {
            return;
        }

        // url转化为参数
        var params = url.parse(res.body.data, true)
        params.query.nickname = ''
        var res1 = yield agent.post(host + '/auth/register').send(params.query)
        res1.body.ok.should.equal(false)
    })

    it("注册输入邮箱校验", function* () {
        // 签名限制，没法伪造错误的信息
        var res = yield agent.get(host + '/auth/register').query({
            nickname: 'test',
            password: 'abcdef',
            email: '576625322@qq.com'
        })
        res.body.ok.should.equal(true)
        if (!res.body.ok) {
            return;
        }

        // url转化为参数
        var params = url.parse(res.body.data, true)
        params.query.email = ''
        var res1 = yield agent.post(host + '/auth/register').send(params.query)
        res1.body.ok.should.equal(false)
    })
})
