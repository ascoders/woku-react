import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import Navbar from '../navbar/index.js'

import Home from '../../home/index.js'
import AuthLogin from '../../auth/login/index.js'
import AuthRegister from '../../auth/register/index.js'

const history = createBrowserHistory()

React.render((
    <Router>
        <Route path="/" component={Navbar}>
            <IndexRoute component={Home}/>
            <Route path="app" component={Home}/>
            <Route path="blog" component={Home}/>
            <Route path="login" component={AuthLogin}/>
            <Route path="register" component={AuthRegister}/>
        </Route>
    </Router>
), document.body)