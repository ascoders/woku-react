var React = require('react')
var Menu = require('antd/lib/menu')
var Link = require('react-router').Link

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <Menu defaultSelectedKeys={[this.props.location.pathname]} mode="horizontal">
                    <Menu.Item key="/">
                        <Link to="/">
                            <i className="anticon anticon-home"></i>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/app">
                        <Link to="/app">
                            浏览
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/blog">
                        <Link to="/blog">
                            博客
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/login">
                        <Link to="/login">
                            登录
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/register">
                        <Link to="/register">
                            注册
                        </Link>
                    </Menu.Item>
                </Menu>
                {this.props.children}
            </div>
        )
    }
})
