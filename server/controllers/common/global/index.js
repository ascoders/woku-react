var user = require('../../../models/user')
var controller = {}

// 用户登陆
controller.currentUser = function* () {
    return this.body = {
        ok: false,
        data: null
    }
}

module.exports = controller
