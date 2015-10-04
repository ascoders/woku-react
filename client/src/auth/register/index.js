import React from 'react'
import StepBar from '../../../component/step'
import Styles from './style.js'
import Form from '../../../component/form'
import RegisterCheck from '../../../../validate/auth/register'
import Alert from 'antd/lib/alert'
import ReactMixin from 'react-mixin'
import AjaxMixin from '../../../mixin/ajax'
import Url from 'url'

export default class Register extends React.Component {
    constructor(props) {
        super(props)

        let currentStep = this.initRegisterCallback()

        this.state = {
            currentStep: currentStep
        }
    }

    initRegisterCallback(){
        // 获取url参数
        var query = Url.parse(location.href, true).query
        if (query.type === 'email') {
            return 3
        }
        return 0
    }

    render() {
        const steps = [{
            title: '基本信息'
        }, {
            title: '邮箱信息'
        }, {
            title: '验证邮件'
        }, {
            title: '注册成功'
        }]

        let baseForm = {
            fields: [{
                title: '昵称',
                name: 'nickname',
                type: 'text',
                tooltip: '长度2-10',
                value: ''
            }, {
                title: '密码',
                name: 'password',
                type: 'password',
                tooltip: '长度6-30',
                value: ''
            }],
            submit: {
                buttonName: '下一步',
                ajax: '/api/common/user/nicknameUnique',
                method: 'get',
                check: RegisterCheck.baseCheck,
                success: ()=> {
                    this.setState({
                        currentStep: 1
                    })
                }
            }
        }

        let emailForm = {
            fields: [{
                title: '邮箱',
                name: 'email',
                type: 'text',
                value: ''
            }],
            submit: {
                buttonName: '下一步',
                ajax: '/api/common/user/emailUnique',
                method: 'get',
                check: RegisterCheck.emailCheck,
                success: ()=> {
                    this.setState({
                        currentStep: 2
                    })

                    // 发送邮箱注册请求
                    let data = {}
                    baseForm.fields.map((item, index)=> {
                        data[item.name] = item.value
                    })
                    emailForm.fields.map((item, index)=> {
                        data[item.name] = item.value
                    })
                    this.ajax('/api/auth/register', {
                        data: data,
                        method: 'get'
                    })
                }
            }
        }

        let formContent
        switch (this.state.currentStep) {
        case 0:
            formContent = (<Form init={baseForm}/>)
            break
        case 1:
            formContent = (<Form init={emailForm}/>)
            break
        case 2:
            formContent = (
                <Alert message="仅差一步"
                       description="请打开邮箱并点击确认链接完成注册"
                       type="success"/>
            )
            break
        case 3:
            formContent = (
                <Alert message="注册成功"
                       description="3秒后跳转至首页"
                       type="success"/>
            )
            break
        }

        return (
            <div>
                <div className="row-flex row-flex-center" style={Styles.mainContainer}>
                    <div className="col-12">
                        <StepBar steps={steps} currentStep={this.state.currentStep}/>
                    </div>
                </div>
                <div className="row-flex row-flex-center">
                    <div className="col-8">
                        <div style={Styles.content}>{formContent}</div>
                    </div>
                </div>
            </div>
        )
    }
}
ReactMixin(Register.prototype, AjaxMixin)