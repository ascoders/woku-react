var email = require('../../../server/lib/email')

describe("lib/email", function () {
    it("邮件发送成功", function* () {
        var result = yield email.send({
            to: '576625322@qq.com',
            subject: '单元测试',
            html: '这是一封单元测试邮件，我不希望它被扔到废纸篓里'
        })
        result.should.equal(true)
    })
})
