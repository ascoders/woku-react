var sign = require('../../../server/lib/sign')
var url = require('url')

describe("lib/sign", function () {
    it("生成的签名可以通过", function () {
        // 随机token
        var token = 'vghj23b4oih3g32jk'

        // 生成签名url
        var signUrl = sign.create(token, 10, {
            nickname: '小明',
            password: '123',
            email: '123456@qq.com'
        })

        // 获取签名url参数
        var urlParam = url.parse(signUrl, true).query
        var ok = sign.check(token, urlParam).ok
        ok.should.equal(true)
    })

    it("过期的签名无法通过", function () {
        // 随机token
        var token = 'vghj23b4oih3g32jk'

        // 生成签名url
        var signUrl = sign.create(token, -1, {
            nickname: '小明',
            password: '123',
            email: '123456@qq.com'
        })

        // 获取签名url参数
        var urlParam = url.parse(signUrl, true).query
        var ok = sign.check(token, urlParam).ok
        ok.should.equal(false)
    })

    it("缺少签名无法通过", function () {
        // 随机token
        var token = 'vghj23b4oih3g32jk'

        // 生成签名url
        var signUrl = sign.create(token, -1, {
            nickname: '小明',
            password: '123',
            email: '123456@qq.com'
        })

        // 获取签名url参数
        var urlParam = url.parse(signUrl, true).query
        urlParam.sign = ''
        var ok = sign.check(token, urlParam).ok
        ok.should.equal(false)
    })

    it("缺少过期时间无法通过", function () {
        // 随机token
        var token = 'vghj23b4oih3g32jk'

        // 生成签名url
        var signUrl = sign.create(token, -1, {
            nickname: '小明',
            password: '123',
            email: '123456@qq.com'
        })

        // 获取签名url参数
        var urlParam = url.parse(signUrl, true).query
        urlParam.expire = ''
        var ok = sign.check(token, urlParam).ok
        ok.should.equal(false)
    })

    it("不正确签名无法通过", function () {
        // 随机token
        var token = 'vghj23b4oih3g32jk'

        // 生成签名url
        var signUrl = sign.create(token, 10, {
            nickname: '小明',
            password: '123',
            email: '123456@qq.com'
        })

        // 获取签名url参数
        var urlParam = url.parse(signUrl, true).query

        // 擅自修改密码参数
        urlParam.password = '456'

        var ok = sign.check(token, urlParam).ok
        ok.should.equal(false)
    })
})
