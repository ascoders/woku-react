/*
 import React from 'react'
 import {Router, Route, IndexRoute} from 'react-router'
 import createBrowserHistory from 'history/lib/createBrowserHistory'

 import Navbar from '../navbar/index.js'

 import Home from '../../home/index.js'
 import AuthLogin from '../../auth/login/index.js'
 import AuthRegister from '../../auth/register/index.js'

 let history = createBrowserHistory()

 React.render((
 <Router history={history}>
 <Route path="/" component={Navbar}>
 <IndexRoute component={Home}/>
 <Route path="app" component={Home}/>
 <Route path="blog" component={Home}/>
 <Route path="login" component={AuthLogin}/>
 <Route path="register" component={AuthRegister}/>
 </Route>
 </Router>
 ), document.body)

 */
var React = require('react')
var reactRouter = require('react-router')
var Router = reactRouter.Router
var Route = reactRouter.Route
var IndexRoute = reactRouter.IndexRoute

var createBrowserHistory = require('history/lib/createBrowserHistory')
let history = createBrowserHistory()

var Navbar = require('../navbar')
var Home = require('../../home')
var AuthLogin = require('../../auth/login')
var AuthRegister = require('../../auth/register')

React.render((
    <Router history={history}>
        <Route path="/" component={Navbar}>
            <IndexRoute component={Home}/>
            <Route path="app" component={Home}/>
            <Route path="blog" component={Home}/>
            <Route path="login" component={AuthLogin}/>
            <Route path="register" component={AuthRegister}/>
        </Route>
    </Router>
), document.body)