var React = require('react')
var Styles = require('./style.js')
var Form = require('../../../component/form')
var LoginCheck = require('../../../../validate/auth/login')
var EnterAnimation = require('antd/lib/enter-animation')

module.exports = React.createClass({
    render: function () {
        // 登录表单配置
        const loginForm = {
            fields: [{
                title: '帐号',
                name: 'account',
                type: 'text',
                placeholder: '帐号 / 邮箱',
                tooltip: '长度2-10'
            }, {
                title: '密码',
                name: 'password',
                type: 'password',
                tooltip: '长度6-30'
            }],
            submit: {
                buttonName: '登录',
                ajax: '/api/auth/login',
                method: 'get',
                check: LoginCheck.check,
                success: (data)=> {
                    console.log(data)
                }
            }
        }

        const formAnimation = {
            enter: {
                type: 'bottom'
            },
            leave: {
                type: 'top'
            }
        }

        return (
            <div className="row-flex row-flex-center" style={Styles.container}>
                <EnterAnimation enter={formAnimation.enter} leave={formAnimation.leave} style={Styles.content}
                                className="col-8">
                    <Form key="loginForm" init={loginForm}/>
                </EnterAnimation>
            </div>
        )
    }
})