import React from 'react'
import Styles from './style.js'
import Form from '../../../component/form'
import LoginCheck from '../../../../validate/auth/login'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
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

        return (
            <div className="row-flex row-flex-center" style={Styles.container}>
                <div className="col-8">
                    <Form init={loginForm}/>
                </div>
            </div>
        )
    }
}