import React from 'react'
import {Steps} from 'antd'
import StepContents from './stepsContent.js'
import './index.scss'
const Step = Steps.Step

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // 当前步骤
            currentStep: 0
        }
    }

    // 进入下一步
    nextStep() {
        this.setState({currentStep: this.state.currentStep + 1})
    }

    render() {
        // 步骤栏
        const steps = [{
            title: '填写信息'
        }, {
            title: '邮箱验证'
        }, {
            title: '注册成功'
        }].map(function (item, index) {
                return (
                    <Step key={index} title={item.title}/>
                )
            })

        // 步骤内容
        let stepContent
        switch (this.state.currentStep) {
        case 0:
             stepContent = StepContents.base
            break
        case 1:
             stepContent = StepContents.email
            break
        case 2:
             stepContent = StepContents.success
            break
        }

        // 步骤按钮
        let stepButton
        if (this.state.currentStep < 2) {
            stepButton = (
                <button onClick={this.nextStep.bind(this)} className="ant-btn ant-btn-primary">下一步</button>
            )
        }

        return (
            <div>
                <div className="row-flex row-flex-center container">
                    <div className="col-12">
                        <Steps current={this.state.currentStep}>{steps}</Steps>
                    </div>
                </div>
                <div className="row-flex row-flex-center">
                    <div className="col-8">
                        {stepContent}
                        {stepButton}
                    </div>
                </div>
            </div>
        )
    }
}
