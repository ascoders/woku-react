require('../setup')
var React = require('react/addons')
var assert = require('assert')
var TestUtils = React.addons.TestUtils
var LoginComponent = require('../../../client/src/auth/login')

describe('auth/login', function () {
    it('test', function *() {
        var renderedComponent = TestUtils.renderIntoDocument(
            <LoginComponent/>
        )
        true.should.equal(true)
    })
})