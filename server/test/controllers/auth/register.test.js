var conf = require('../../../config/config')
var host = 'http://localhost:' + conf.web.port + '/api'

var agent = require('superagent').agent()

require('../../../app')

describe("controllers", function () {
    describe("auth", function () {
        describe("register", function () {
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
/*
            it("根据邮件内容注册", function* () {
                var res = yield agent.get(host + '/auth/register').query({
                    nickname: 'test',
                    password: 'abcdef',
                    email: '576625322@qq.com'
                })
                res.body.ok.should.equal(true)
            })
            */
        })
    })
})
