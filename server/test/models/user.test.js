var user = require('../../../server/models/user')
var userModel = require('../../../server/models/user/model')
var muk = require('muk')
var crypto = require('crypto')
var assert = require('assert')

describe('models/user', function () {
    before(function* () {
        // 创建数据表
        yield userModel.sync()
    })

    afterEach(function* () {
        var result = yield user.del({
            where: {
                nickname: {
                    $in: ['test', 'test1', 'test2']
                }
            }
        })
        result.ok.should.equal(true)
    })

    after(function* () {
        // 删除数据表
        yield userModel.drop()
    })

    describe('插入', function () {
        it('可以成功', function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(true)
        })

        it('token生成错误返回error', function* () {
            muk(crypto, 'randomBytes', function (length, callback) {
                process.nextTick(function () {
                    callback(new Error('err!'), null)
                })
            })

            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef',
                email: '576625322@qq.com'
            })

            muk.restore()
            result.ok.should.equal(false)
        })

        it('主键不能赋值', function* () {
            var result = yield user.add({
                id: 100,
                nickname: 'test',
                password: 'abcdef',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(false)
        })
/*
        it('昵称不能为空', function* () {
            var result = yield user.add({
                password: 'abcdef',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(false)
        })
*/
        it('昵称不能重复', function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef',
                email: '576625322@qq.com'
            })

            result = yield user.add({
                nickname: 'test',
                password: 'ccc',
                email: 'bbb@qq.com'
            })
            result.ok.should.equal(false)
        })
/*
        it('密码不能为空', function* () {
            var result = yield user.add({
                nickname: 'test',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(false)
        })

        it('密码长度大于6', function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcde',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(false)
        })

        it('密码长度小于30', function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdeabcdeabcdeabcdeabcdeabcdea',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(false)
        })

        it('邮箱不能为空', function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef'
            })
            result.ok.should.equal(false)
        })
*/
        it('邮箱不能重复', function* () {
            var result = yield user.add({
                nickname: 'test1',
                password: 'abcdef',
                email: 'aaa1@qq.com'
            })

            result = yield user.add({
                nickname: 'test2',
                password: 'ccc',
                email: 'aaa1@qq.com'
            })
            result.ok.should.equal(false)
        })
/*
        it('邮箱格式校验', function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef',
                email: '576625322qq.com'
            })
            result.ok.should.equal(false)
        })
 */
    })

    describe('删除', function () {
        beforeEach(function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(true)
        })

        it('删除成功', function* () {
            var result = yield user.del({
                where: {
                    nickname: 'test'
                }
            })
            result.ok.should.equal(true)
        })
    })

    describe('修改', function () {
        beforeEach(function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(true)
        })

        afterEach(function* () {
            var result = yield user.del({
                where: {
                    nickname: 'test'
                }
            })
            result.ok.should.equal(true)
        })

        it('更新成功', function* () {
            var result = yield user.update({
                portrait: '123'
            }, {
                where: {
                    nickname: 'test'
                }
            })
            result.ok.should.equal(true)
        })
    })

    describe('查找', function () {
        beforeEach(function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(true)

            result = yield user.add({
                nickname: 'test1',
                password: 'abcdef',
                email: '5766253221@qq.com'
            })
            result.ok.should.equal(true)

            result = yield user.add({
                nickname: 'test2',
                password: 'abcdef',
                email: '5766253223@qq.com'
            })
            result.ok.should.equal(true)
        })

        afterEach(function* () {
            var result = yield user.del({
                where: {
                    nickname: {
                        $in: ['test', 'test1', 'test2']
                    }
                }
            })
            result.ok.should.equal(true)
        })

        it('单个查找', function* () {
            var result = yield user.findOne({
                where: {
                    nickname: 'test'
                }
            })
            result.ok.should.equal(true)
        })

        it('多个查找', function* () {
            var result = yield user.findAll({
                where: {
                    nickname: {
                        $in: ['test', 'test1', 'test2']
                    }
                }
            })
            result.ok.should.equal(true)
            result.data.length.should.equal(3)
        })

        it('查找指定列', function* () {
            var result = yield user.findOne({
                where: {
                    nickname: 'test'
                },
                attributes: ['email', 'nickname']
            })
            result.ok.should.equal(true)
            result.data.email.should.equal('576625322@qq.com')
            assert.equal(result.data.id, undefined)
        })

        it('查找并返回总数', function* () {
            var result = yield user.findAndCountAll({
                where: {
                    nickname: 'test'
                },
                attributes: ['email', 'nickname']
            })
            result.ok.should.equal(true)
            result.data.count.should.equal(1)
        })
    })
})
