import React from 'react'
import {Router, Route} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import Home from '../../home/index'

const history = createBrowserHistory()

React.render((
    <Router>
        <Route path="/" component={Home}/>
        <Route path="hello/">
            <Route path=":name" component={Home}/>
        </Route>
    </Router>
), document.body)