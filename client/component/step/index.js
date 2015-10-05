var React = require('react')
var Steps = require('antd/lib/steps')
const Step = Steps.Step

module.exports = React.createClass({
    render: function () {
        // 步骤栏
        const steps = this.props.steps.map(function (item, index) {
            return (
                <Step key={index} title={item.title}/>
            )
        })

        return (
            <Steps className="ant-form-horizontal" current={this.props.currentStep}>{steps}</Steps>
        )
    }
})
