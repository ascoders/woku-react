import React from 'react'
import {Router, Route} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import Navbar from '../navbar/index.js'

import Home from '../../home/index.js'

const history = createBrowserHistory()

React.render((
    <Router>
        <Route path="/" component={Navbar}>
            <Route path="app" component={Home}/>
            <Route path="blog" component={Home}/>
        </Route>
    </Router>
), document.body)