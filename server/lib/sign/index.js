var crypto = require('crypto')

// 生成签名
function createToken(token, params) {
    // 按照排序的键值组合
    var str = ''
    var keys = []

    for (var k in params) {
        keys.push(k)
    }
    keys.sort()

    // 组合待加密字符串
    for (var i = 0, j = keys.length; i < j; i++) {
        if (keys[i] === 'sign') { // 排除签名参数
            continue
        }
        str += params[keys[i]]
    }

    // 生成签名
    return crypto.createHash('md5').update(str + token).digest('hex')
}

// 生成签名url
exports.create = function (token, expire, params) {
    // 添加过期时间参数
    var time = (new Date()).valueOf() + expire * 1000
    params.expire = time
    params.sign = createToken(token, params)

    // 最终paramUrl
    var paramUrl = '?'
    for (var k in params) {
        paramUrl += k + '=' + params[k] + '&'
    }
    paramUrl = paramUrl.substr(0, paramUrl.length - 1)

    return paramUrl
}

// 校验签名
exports.check = function (token, params) {
    if (!params.sign) {
        return {
            ok: false,
            data: '缺少签名'
        }
    }

    if (!params.expire) {
        return {
            ok: false,
            data: '缺少过期时间'
        }
    }

    // 是否过期
    if ((new Date()).valueOf() > params.expire) {
        return {
            ok: false,
            data: '签名已过期'
        }
    }

    var sign = createToken(token, params)

    if (params.sign !== sign) {
        return {
            ok: false,
            data: '签名错误'
        }
    }

    return {
        ok: true
    }
}
