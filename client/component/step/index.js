import React from 'react'
import Steps from 'antd/lib/steps'
const Step = Steps.Step

export default class StepBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        // 步骤栏
        const steps = this.props.steps.map(function (item, index) {
                return (
                    <Step key={index} title={item.title}/>
                )
            })

        return (
                <Steps current={this.props.currentStep}>{steps}</Steps>
        )
    }
}
