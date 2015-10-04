import React from 'react'
import Checkbox from 'antd/lib/checkbox'
import Radio from 'antd/lib/radio'
import Tooltip from 'antd/lib/tooltip'
import Message from 'antd/lib/message'
import Validator from 'validator'
import ReactMixin from 'react-mixin'
import AjaxMixin from '../../mixin/ajax'

export default class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onChange(item, event) {
        this.setState({
            [item.name]: event.target.value
        })

        // 改变父级的value
        this.props.init.fields.map((each, index)=> {
            if (each.name === item.name) {
                each.value = event.target.value
            }
        })
    }

    submit() {
        if (this.props.init.submit.ajax) { // 提交之前发送请求
            this.ajax(this.props.init.submit.ajax, {
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
            let check = this.props.init.submit.check(this.state)
            if (!check.ok) {
                return Message.error(check.data)
            }
            this.props.init.submit.success(check)
        }

    }

    render() {
        let loadingClass = this.state.loading ? 'ant-btn-loading' : ''

        let formItems = this.props.init.fields.map((item, index)=> {
            return (
                <div className="ant-form-item" key={item.name}>
                    <label htmlFor={item.name} className="col-6" required>{item.title}：</label>

                    <div className="col-18">
                        <Tooltip title={item.tooltip}>
                            <input className="ant-input" type={item.type} id={item.name} placeholder={item.placeholder}
                                   defaultValue={item.value}
                                   onChange={this.onChange.bind(this,item)}
                                   value={null}/>
                        </Tooltip>
                    </div>
                </div>
            )
        })

        return (
            <div className="ant-form-horizontal">
                {formItems}
                <div className="row">
                    <div className="col-16 col-offset-6">
                        <button type="submit" className={'ant-btn ant-btn-primary '+loadingClass}
                                onClick={this.submit.bind(this)}>{this.props.init.submit.buttonName}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
ReactMixin(Form.prototype, AjaxMixin)