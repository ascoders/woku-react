import React from 'react'
import Checkbox from 'antd/lib/checkbox'
import Radio from 'antd/lib/radio'
import Tooltip from 'antd/lib/tooltip'
import Message from 'antd/lib/message'
import Validator from 'validator'
import LoginCheck from '../../../../validate/auth/login'
import ReactMixin from 'react-mixin'
import AjaxMixin from '../../../mixin/ajax'
import Styles from './style.js'

import Form from '../../../component/form'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    accountChange(event) {
        this.setState({
            account: event.target.value
        })
    }

    passwordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    login() {
        this.post('/api/auth/login', {
            data: {
                account: this.state.account,
                password: this.state.password
            },
            preCheck: ()=> {
                // 公共登录输入校验
                return LoginCheck.check(this.state)
            },
            success: (data)=> {

            },
            error: (data)=> {

            },
            before: ()=> {
                this.setState({
                    loading: true
                })
            },
            after: ()=> {
                this.setState({
                    loading: false
                })
            }
        })
    }

    render() {
        var loadingClass = this.state.loading ? 'ant-btn-loading' : ''

        return (
            <div className="row-flex row-flex-center" style={Styles.container}>
                <div className="col-8">
                    <div className="ant-form-horizontal">
                        <div className="ant-form-item">
                            <label htmlFor="account" className="col-6" required>帐号：</label>

                            <div className="col-18">
                                <Tooltip title="长度2-10">
                                    <input className="ant-input" type="text" id="account" placeholder="帐号 / 邮箱"
                                           onChange={this.accountChange.bind(this)}
                                           value={null}/>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="ant-form-item">
                            <label htmlFor="password" className="col-6" required>密码：</label>

                            <div className="col-18">
                                <Tooltip title="长度6-30">
                                    <input className="ant-input" type="password" id="password"
                                           onChange={this.passwordChange.bind(this)}
                                           value={null}/>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-16 col-offset-6">
                                <button type="submit" className={'ant-btn ant-btn-primary '+loadingClass}
                                        onClick={this.login.bind(this)}>登录
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
ReactMixin(Login.prototype, AjaxMixin)