"use strict"

var React = require('react')
var reactRouter = require('react-router')
var Router = reactRouter.Router
var Route = reactRouter.Route
var IndexRoute = reactRouter.IndexRoute

//var createBrowserHistory = require('history/lib/createBrowserHistory')
//let history = createBrowserHistory()

var Navbar = require('./src/common/navbar/index')
var Home = require('./src/home/index')
var AuthLogin = require('./src/auth/login/index')
var AuthRegister = require('./src/auth/register/index')

module.exports = (
    <Router>
        <Route path="/" component={Navbar}>
            <IndexRoute component={Home}/>
            <Route path="app" component={Home}/>
            <Route path="blog" component={Home}/>
            <Route path="login" component={AuthLogin}/>
            <Route path="register" component={AuthRegister}/>
        </Route>
    </Router>
)