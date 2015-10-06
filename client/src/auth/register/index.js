const React = require('react')
const StepBar = require('../../../component/step')
const Styles = require('./style.js')
const Form = require('../../../component/form')
const RegisterCheck = require('../../../../validate/auth/register')
const Alert = require('antd/lib/alert')
const ajax = require('../../../lib/ajax')
const SetTimeoutMixin = require('../../../mixin/set-timeout')
const EnterAnimation = require('antd/lib/enter-animation')

module.exports = React.createClass({
    mixins: [SetTimeoutMixin],

    getInitialState: function () {
        return {currentStep: 0}
    },

    componentWillMount: function () {
        // 注册时需要用到的数据
        this.registerData = {}
        this.initRegisterCallback()
    },

    initRegisterCallback: function () {
        // 获取url参数
        if (this.props.location.query.type === 'email') {
            ajax.send('/api/auth/register', {
                method: 'post',
                data: this.props.location.query,
                success: ()=> {
                    this.setState({
                        currentStep: 3
                    })

                    // 3s 后返回首页
                    this.setTimeout(()=> {
                        this.props.history.go('/')
                    }, 3000)
                }
            })
        }
    },

    render: function () {
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
                onChange: (value)=> {
                    this.registerData.nickname = value
                }
            }, {
                title: '密码',
                name: 'password',
                type: 'password',
                tooltip: '长度6-30',
                onChange: (value)=> {
                    this.registerData.password = value
                }
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
                onChange: (value)=> {
                    this.registerData.email = value
                }
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
                    ajax.send('/api/auth/register', {
                        data: this.registerData,
                        method: 'get'
                    })
                }
            }
        }

        let formContent
        switch (this.state.currentStep) {
        case 0:
            formContent = (<Form key="base" init={baseForm}/>)
            break
        case 1:
            formContent = (<Form key="email" init={emailForm}/>)
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

        const stepAnimation = {
            enter: {
                type: 'right'
            }
        }

        const formAnimation = {
            enter: {
                delay: 0.4,
                type: 'bottom'
            },
            leave: {
                delay: 0,
                duration: 0.3,
                reverse: true,
                type: 'bottom'
            }
        }

        return (
            <div>
                <div className="row-flex row-flex-center" style={Styles.mainContainer}>
                    <EnterAnimation animation={stepAnimation.enter} className="col-12">
                        <StepBar key="steps" steps={steps} currentStep={this.state.currentStep}/>
                    </EnterAnimation>
                </div>
                <div className="row-flex row-flex-center">
                    <div className="col-8">
                        <EnterAnimation enter={formAnimation.enter} leave={formAnimation.leave}
                                        style={Styles.content}>{formContent}</EnterAnimation>
                    </div>
                </div>
            </div>
        )
    }
})