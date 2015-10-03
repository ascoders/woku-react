import Request from 'superagent'
import Message from 'antd/lib/message'

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

export default{
    get(url, opts){
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

        this.opts = opts

        let check = opts.preCheck()
        if (check && !check.ok) {
            this.opts.error(check)
            return Message.error(check.data)
        }

        opts.before()

        return Request.get(url).query(opts.data).end(handleResponse.bind(this))
    },

    post(url, opts){
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

        this.opts = opts

        let check = opts.preCheck()
        if (check && !check.ok) {
            this.opts.error(check)
            return Message.error(check.data)
        }

        opts.before()

        return Request.post(url).send(opts.data).end(handleResponse.bind(this))
    }
}


