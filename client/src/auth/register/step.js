import React from 'react'
import Steps from 'antd/lib/steps'
const Step = Steps.Step
import Styles from './style.js'

export default class StepBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // 当前步骤
            currentStep: 0
        }
        this.props.onChangeStep(this.state.currentStep)
    }

    // 进入下一步
    nextStep() {
        let nextStep = this.state.currentStep + 1
        this.setState({currentStep: nextStep})
        this.props.onChangeStep(nextStep)
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

        // 步骤按钮
        let stepButton
        if (this.state.currentStep < 2) {
            stepButton = (
                <button onClick={this.nextStep.bind(this)} className="ant-btn ant-btn-primary">下一步</button>
            )
        }

        return (
            <div>
                <div style={Styles.stepContainer}>
                    <Steps current={this.state.currentStep}>{steps}</Steps>
                </div>
                {this.props.children}
                {stepButton}
            </div>
        )
    }
}
