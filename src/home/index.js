import React from 'react'
import {Link} from 'react-router'

import NavBar from '../common/navbar'

const Home = React.createClass({
    render(){
        return (
            <div>
                <NavBar/>
                <Link to="/hello/123" activeClassName="active">123</Link>&nbsp;
                <Link to="/hello/456" activeClassName="active">456</Link>
            </div>
        )
    }
})

module.exports = Home