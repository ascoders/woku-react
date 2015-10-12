var model = require('./model')
var curl = require('../curl')(model)

// 增
exports.add = function *(info) {
    return yield curl.add(info)
}

// 删
exports.del = function *(opts) {
    return yield curl.del(opts)
}

// 改
exports.update = function *(info, opts) {
    return yield curl.update(info, opts)
}

// 查
exports.findOne = function *(info) {
    return yield curl.findOne(info)
}

// 查多个
exports.findAll = function *(info) {
    return yield curl.findAll(info)
}

// 查多个数据和数量
exports.findAndCountAll = function *(info) {
    return yield curl.findAndCountAll(info)
}
