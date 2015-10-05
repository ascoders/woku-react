var React = require('react')
var Checkbox = require('antd/lib/checkbox')
var Radio = require('antd/lib/radio')
var Tooltip = require('antd/lib/tooltip')
var Message = require('antd/lib/message')
var ajax = require('../../lib/ajax')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    onChange: function (item,event) {
        this.setState({
            [item.name]: event.target.value
        })

        // 触发父级方法
        this.props.init.fields.map((each)=> {
            if (each.name === item.name) {
                each.value = event.target.value

                if (typeof each.onChange === 'function') {
                    each.onChange(event.target.value)
                }
            }
        })
    },

    onKeyDown: function (item, event) {
        if (event.keyCode === 13) { // 按下回车
            this.submit()
        }
    },

    submit: function () {
        if (this.props.init.submit.ajax) { // 提交之前发送请求
            ajax.send(this.props.init.submit.ajax, {
                data: this.state,
                method: this.props.init.submit.method,
                preCheck: ()=> {
                    return this.props.init.submit.check(this.state)
                },
                success: (data)=> {
                    this.props.init.submit.success(data)
                },
                error: (data)=> {

                },
                before: ()=> {
                    this.setState({
                        loading: true
                    })
                },
                after: ()=> {
                    this.setState({
                        loading: false
                    })
                }
            })
        } else {
            let check = this.props.init.submit.check(state)
            if (!check.ok) {
                return Message.error(check.data)
            }
            this.props.init.submit.success(check)
        }

    },

    render: function () {
        let loadingClass = this.state.loading ? 'ant-btn-loading' : ''

        let formItems = this.props.init.fields.map((item, index)=> {
            let inputContent = (
                <input className="ant-input" type={item.type} id={item.name} placeholder={item.placeholder}
                       onKeyDown={this.onKeyDown.bind(this, item)}
                       defaultValue={item.value}
                       onChange={this.onChange.bind(this, item)}
                       value={null}/>
            )

            let inputContentTooltip

            if (item.tooltip) {
                inputContentTooltip = (
                    <Tooltip title={item.tooltip}>
                        {inputContent}
                    </Tooltip>
                )
            } else {
                inputContentTooltip = inputContent
            }

            return (
                <div className="ant-form-item" key={item.name}>
                    <label htmlFor={item.name} className="col-6" required>{item.title}：</label>

                    <div className="col-18">
                        {inputContentTooltip}
                    </div>
                </div>
            )
        })

        return (
            <div className="ant-form-horizontal">
                {formItems}
                <div className="row" key="submit-button">
                    <div className="col-16 col-offset-6">
                        <button type="submit" className={'ant-btn ant-btn-primary '+loadingClass}
                                onClick={this.submit}>{this.props.init.submit.buttonName}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
})