var crypto = require('crypto')

// 范围随机数包含最大最小
exports.range = function (min, max) {
    return Math.floor(min + Math.random() * (max - min))
}

// 随机生成32位token
exports.randomToken = function () {
    return function (done) {
        crypto.randomBytes(16, function (err, buf) {
            if (err) {
                return done(null, '')
            }
            return done(null, buf.toString('hex'))
        })
    }
}