import React from 'react'
import {Link} from 'react-router'

import NavBar from '../common/navbar/index.js'

export default class Home extends React.Component {
     render() {
        return (
            <div>
                <NavBar/>
                <Link to="/hello/123" activeClassName="active">123</Link>&nbsp;
                <Link to="/hello/456" activeClassName="active">456</Link>
            </div>
        )
    }
}
