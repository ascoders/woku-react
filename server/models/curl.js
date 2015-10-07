var validator = require('validator')

module.exports = function (model) {
    return {
        // 增
        add: function (info) {
            return function (done) {
                if (!validator.isNull(info.id)) {
                    return done(null, {
                        ok: false,
                        data: '主键不能赋值'
                    })
                }

                model.create(info).then(function (result) {
                    return done(null, {
                        ok: true,
                        data: result
                    })
                }).catch(function (err) {
                    return done(null, {
                        ok: false,
                        data: err
                    })
                })
            }
        },

        // 删
        del: function (opts) {
            return function (done) {
                model.destroy(opts).then(function (result) {
                    return done(null, {
                        ok: true,
                        data: result
                    })
                }).catch(function (err) {
                    return done(null, {
                        ok: false,
                        data: err
                    })
                })
            }
        },

        // 改
        update: function (info, opts) {
            return function (done) {
                model.update(info, opts).then(function (result) {
                    return done(null, {
                        ok: true,
                        data: result
                    })
                }).catch(function (err) {
                    return done(null, {
                        ok: false,
                        data: err
                    })
                })
            }
        },

        // 查
        findOne: function (info) {
            return function (done) {
                model.findOne(info).then(function (result) {
                    if (result) {
                        return done(null, {
                            ok: true,
                            data: result
                        })
                    } else {
                        resolve({
                            ok: false,
                            data: '用户不存在'
                        })
                    }
                }).catch(function (err) {
                    return done(null, {
                        ok: false,
                        data: err
                    })
                })
            }
        },

        // 查多个
        findAll: function (info) {
            return function (done) {
                model.findAll(info).then(function (result) {
                    if (result) {
                        return done(null, {
                            ok: true,
                            data: result
                        })
                    } else {
                        return done(null, {
                            ok: false,
                            data: '用户不存在'
                        })
                    }
                }).catch(function (err) {
                    return done(null, {
                        ok: false,
                        data: err
                    })
                })
            }
        },

        // 查找多个数据和数量
        findAndCountAll: function (info) {
            return function (done) {
                model.findAndCountAll(info).then(function (result) {
                    return done(null, {
                        ok: true,
                        data: result
                    })
                }).catch(function (err) {
                    return done(null, {
                        ok: false,
                        data: err
                    })
                })
            }
        }
    }
}