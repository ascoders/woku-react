var user = require('../../../models/user')

// 根据昵称查询
exports.nickname = {
    get: function *() {
        // 查询昵称是否存在
        var result = yield user.findOne({
            where: {
                nickname: this.query.nickname
            },
            attribute: ['id']
        })

        if (result.ok) {
            // 查到了用户
            return this.body = {
                ok: true,
                data: result.data
            }
        }

        return this.body = {
            ok: false,
            data: '用户不存在'
        }
    }
}

// 查询昵称是否重复
exports.nicknameUnique = {
    get: function *() {
        // 查询昵称是否存在
        var result = yield user.findOne({
            where: {
                nickname: this.query.nickname
            },
            attribute: ['id']
        })

        if (result.ok) {
            // 查到了用户
            return this.body = {
                ok: false,
                data: '昵称已存在',
                code: 'nickname'
            }
        }

        return this.body = {
            ok: true
        }
    }
}

// 查询邮箱是否重复
exports.emailUnique = {
    get: function*() {
        // 查询邮箱是否存在
        var result = yield user.findOne({
            where: {
                email: this.query.email
            },
            attribute: ['id']
        })

        if (result.ok) {
            // 查到了用户
            return this.body = {
                ok: false,
                data: '邮箱已存在',
                code: 'email'
            }
        }

        return this.body = {
            ok: true
        }
    }
}

// 获取当前登录用户
exports.current = {
    get: function *() {
        if (!this.session.uid) {
            return this.body = {
                ok: false,
                data: '未登录'
            }
        }

        var result = yield user.findOne({
            where: {
                id: this.session.uid
            }
        })

        if (!result.ok) {
            return this.body = {
                ok: false,
                data: '用户不存在'
            }
        }

        return this.body = {
            ok: true,
            data: result.data
        }
    }
}