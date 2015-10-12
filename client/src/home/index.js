var React = require('react')
var Carousel = require('antd/lib/carousel')
var Style = require('./style.js')

var CreateAppModal = require('./create-app-modal')

module.exports = React.createClass({
    render: function () {
        return (
            <div className="test">
                <Carousel>
                    <div>
                        <CreateAppModal/>
                    </div>

                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
            </div>
        )
    }
})
