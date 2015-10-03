import React from 'react'
import Alert from 'antd/lib/alert'
import Tooltip from 'antd/lib/tooltip'

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        switch (this.props.currentStep) {
        case 0:
            return (
                <form className="ant-form-horizontal">
                    <div className="ant-form-item">
                        <label htmlFor="nickname" className="col-6" required>昵称：</label>

                        <div className="col-18">
                            <Tooltip title="长度2-10">
                                <input className="ant-input" type="text" id="nickname"/>
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
                </form>
            )
        case 1:
            return (
                <form className="ant-form-horizontal">
                    <div className="ant-form-item">
                        <label htmlFor="email" className="col-6" required>邮箱：</label>

                        <div className="col-18">
                            <input className="ant-input" type="email" id="email"/>
                        </div>
                    </div>
                </form>
            )
        case 2:
            return (
                <Alert message="成功提示的文案"
                       description="成功提示的辅助性文字介绍成功提示的辅助性文字介绍成功提示的辅助性文字介绍成功提示的辅助性文字介绍"
                       type="success"/>
            )
        }
    }
}
