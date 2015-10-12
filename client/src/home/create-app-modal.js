var React = require('react')
var Modal = require('antd/lib/modal')
var Form = require('../../component/form')
var EnterAnimation = require('antd/lib/enter-animation')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            visible: false,
            confirmLoading: false
        }
    },

    handleOk: function () {
        this.setState({
            visible: false
        })
    },

    handleCancel: function () {
        this.setState({
            visible: false
        })
    },

    showModal: function () {
        this.setState({
            visible: true
        })
    },

    render: function () {
        const appForm = {
            fields: [{
                title: '应用名称',
                name: 'name',
                type: 'text',
                placeholder: '',
                tooltip: '长度2-10'
            }, {
                title: '路径',
                name: 'path',
                type: 'text',
                tooltip: '长度6-30'
            }],
            submit: {
                buttonName: '登录',
                ajax: '/api/auth/login',
                method: 'get',
                //check: LoginCheck.check,
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
            <div>
                <button className="ant-btn ant-btn-primary ant-btn-lg"
                        onClick={this.showModal}>立即创建
                </button>

                <Modal title="创建应用"
                       visible={this.state.visible}
                       confirmLoading={this.state.confirmLoading}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <div className="row-flex row-flex-center">
                        <EnterAnimation enter={formAnimation.enter}
                                        leave={formAnimation.leave}
                                        className="col-24">
                            <Form key="loginForm"
                                  init={appForm}/>
                        </EnterAnimation>
                    </div>
                </Modal>
            </div>
        )
    }
})