import React from 'react'
import {Checkbox, Radio, RadioGroup, Tooltip} from 'antd'
import './index.scss'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="row-flex row-flex-center container">
                <div className="col-8">
                    <form className="ant-form-horizontal">
                        <div className="ant-form-item">
                            <label htmlFor="account" className="col-6" required>帐号：</label>

                            <div className="col-18">
                                <Tooltip title="长度2-10">
                                    <input className="ant-input" type="text" id="account" placeholder="帐号 / 邮箱"/>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="ant-form-item">
                            <label htmlFor="password" className="col-6" required>密码：</label>

                            <div className="col-18">
                                <Tooltip title="长度6-30">
                                    <input className="ant-input" type="password" id="password"/>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-16 col-offset-6">
                                <input type="submit" className="ant-btn ant-btn-primary" value="确 定" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
