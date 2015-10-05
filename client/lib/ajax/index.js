var agent = require('superagent')
var Message = require('antd/lib/message')

function handleResponse(err, res) {
    this.opts.after()

    if (err) {
        this.opts.error(res.body)
        return Message.error('无网络')
    }

    if (!res.body.ok) {
        this.opts.error(res.body)
        return Message.error(res.body.data)
    }

    this.opts.success(res.body)
}

module.exports = {
    send: function (url, opts) {
        opts.preCheck = opts.preCheck || function () {
            }
        opts.success = opts.success || function () {
            }
        opts.error = opts.error || function () {
            }
        opts.before = opts.before || function () {
            }
        opts.after = opts.after || function () {
            }
        opts.method = opts.method || 'get'

        this.opts = opts

        let check = opts.preCheck()
        if (check && !check.ok) {
            this.opts.error(check)
            return Message.error(check.data)
        }

        opts.before()

        switch (this.opts.method) {
        case 'get':
            return agent.get(url).query(opts.data).end(handleResponse.bind(this))
        case 'post':
            return agent.post(url).send(opts.data).end(handleResponse.bind(this))
        }
    }
}