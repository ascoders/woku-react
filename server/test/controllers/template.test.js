var conf = require('../../config/config')
var defaultHost = 'http://localhost:' + conf.web.port

var agent = require('superagent').agent()

require('../../app')

describe("controllers", function () {
    it("默认url为模板", function* () {
        var res = yield agent.get(defaultHost)
        res.res.text.should.containEql('<!DOCTYPE html>')
    })
})
