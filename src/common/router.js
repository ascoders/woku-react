import React from 'react'
import {Router, Route} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

const history = createBrowserHistory()

const Home = require('../home/index')

React.render((
    <Router>
        <Route path="/" component={Home}/>
        <Route path="hello/">
            <Route path=":name" component={Home}/>
        </Route>
    </Router>
), document.body)