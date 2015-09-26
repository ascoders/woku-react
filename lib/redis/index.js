var redis = require('redis')
var conf = require('../../config/config')
var client = redis.createClient(conf.redis.port, conf.redis.host)

exports.client = client

exports.set = function (key, value, expire) {
    if (typeof value === 'object') { // 将对象序列化为字符串
        value = JSON.stringify(value)
    }
    client.set(key, value)
    client.expire(key, expire)
}

exports.get = function (key, parse) {
    return new Promise(function (resolve) {
        client.get(key, function (err, reply) {
            if (err) {
                resolve(null)
            } else {
                // 反序列化（可能存的是对象转化的字符串）
                if (parse) {
                    reply = JSON.parse(reply)
                }
                resolve(reply)
            }
        })
    })
}
