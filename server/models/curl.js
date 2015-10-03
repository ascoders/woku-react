module.exports = function (model) {
    return {
        // 增
        add: function (info) {
            return new Promise(function (resolve) {
                model.create(info).then(function (result) {
                    return resolve({
                        ok: true,
                        data: result
                    })
                }).catch(function (err) {
                    return resolve({
                        ok: false,
                        data: err
                    })
                })
            })
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
            return new Promise(function (resolve) {
                model.update(info, opts).then(function (result) {
                    resolve({
                        ok: true,
                        data: result
                    })
                }).catch(function (err) {
                    console.log('error', err)
                    resolve({
                        ok: false,
                        data: err
                    })
                })
            })
        },

        // 查
        findOne: function (info) {
            return new Promise(function (resolve) {
                model.findOne(info).then(function (result) {
                    if (result) {
                        resolve({
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
                    resolve({
                        ok: false,
                        data: err
                    })
                })
            })
        },

        // 查多个
        findAll: function (info) {
            return new Promise(function (resolve) {
                model.findAll(info).then(function (result) {
                    if (result) {
                        resolve({
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
                    resolve({
                        ok: false,
                        data: err
                    })
                })
            })
        },

        // 查找多个数据和数量
        findAndCountAll: function (info) {
            return new Promise(function (resolve) {
                model.findAndCountAll(info).then(function (result) {
                    resolve({
                        ok: true,
                        data: result
                    })
                }).catch(function (err) {
                    resolve(err)
                })
            })
        }
    }
}