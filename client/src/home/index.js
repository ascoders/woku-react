var React = require('react')
var EnterAnimation = require('antd/lib/enter-animation')
var Carousel = require('antd/lib/carousel')
//import Style from './style.js'

module.exports = React.createClass({
    render() {
        const animation = {
            enter: {
                type: 'right'
            }
        }

        return (
            <div>
                <Carousel>
                    <div>
                        <button className="ant-btn ant-btn-primary ant-btn-lg">立即创建</button>
                    </div>

                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
            </div>
        )
    }
})
