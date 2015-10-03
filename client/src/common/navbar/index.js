import React from 'react'
import Menu from 'antd/lib/menu'
import EnterAnimation from 'antd/lib/enter-animation'
import {Link} from 'react-router'

export default class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    clickPage() {
        this.setState({
            enter: {delay: 0.3},
            leave: {delay: 0, duration: 0.3}
        })
    }

    render() {
        var key = this.props.location.pathname
        return (
            <div>
                <Menu onClick={this.handleClick} mode="horizontal">
                    <Menu.Item key="/app">
                        <Link to="/app" onClick={this.clickPage.bind(this)}>
                            <i className="anticon anticon-appstore"></i>浏览
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/blog">
                        <Link to="/blog" onClick={this.clickPage.bind(this)}>
                            <i className="anticon anticon-book"></i>博客
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/login">
                        <Link to="/login" onClick={this.clickPage.bind(this)}>
                            登录
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/register">
                        <Link to="/register" onClick={this.clickPage.bind(this)}>
                            注册
                        </Link>
                    </Menu.Item>
                </Menu>
                <EnterAnimation enter={this.state.enter} leave={this.state.leave}>
                    {React.cloneElement(this.props.children, {key: key})}
                </EnterAnimation>
            </div>
        )
    }
}
