import React from 'react'
import StepBar from './step.js'
import RegisterFrom from './form.js'
import Styles from './style.js'
import Message from 'antd/lib/message'


export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 0
        }
    }

    // 步骤发生变化
    onChangeStep(currentStep) {
        this.setState({
            currentStep: currentStep
        })
    }

    render() {
        return (
            <div className="row-flex row-flex-center" style={Styles.mainContainer}>
                <div className="col-8">
                    <StepBar onChangeStep={this.onChangeStep.bind(this)}>
                        <RegisterFrom style={Styles.formContainer} currentStep={this.state.currentStep}/>
                    </StepBar>
                </div>
            </div>
        )
    }
}

