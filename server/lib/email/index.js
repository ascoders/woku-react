// 发邮件总是异步的
var conf = require('../../config/config')
var nodemailer = require("nodemailer")
var smtpTransport = require('nodemailer-smtp-transport')

var transporter = nodemailer.createTransport(smtpTransport({
    host: conf.email.host,
    port: conf.email.port,
    auth: {
        user: conf.email.user,
        pass: conf.email.password
    }
}))

exports.send = function (opts) {
    return new Promise(function (resolve) {
        var mailOptions = {
            from: conf.email.from,
            to: opts.to,
            subject: opts.title,
            html: opts.content
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return resolve(false)
            }
            return resolve(true)
        })
    })
}
