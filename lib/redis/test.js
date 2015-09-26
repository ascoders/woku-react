var redis = require('./index')
var assert = require('assert')
var muk = require('muk')

describe("lib/redis", function () {
    it("存储的字符串能被查找到", function* () {
        var key = 'test'
        var value = 'abc'
        redis.set(key, value, 10)

        // 查询存储的字符串
        var result = yield redis.get(key)
        result.should.equal(value)
    })

    it("过期的不能被查找到", function* () {
        var key = 'test'
        var value = 'abc'
        redis.set(key, value, -1)

        // 查询存储的字符串
        var result = yield redis.get(key)
        assert.equal(result, null)
    })

    it("可以存储并解析object", function* () {
        var key = 'test'
        var value = {
            a: 1,
            b: 2
        }
        redis.set(key, value, 10)

        // 查询存储的字符串
        var result = yield redis.get(key, true)
        assert.deepEqual(result, value)
    })

    it("读取报错，则读取null", function* () {
        muk(redis.client, 'get', function (key, callback) {
            process.nextTick(function () {
                callback(new Error('err!'), null)
            })
        })

        var key = 'test'
        var value = {
            a: 1,
            b: 2
        }
        redis.set(key, value, 10)

        // 查询存储的字符串
        var result = yield redis.get(key, true)

        muk.restore()
        assert.equal(result, null)
    })
})
