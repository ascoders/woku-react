require('node-jsx').install()

var React = require('react')
//var Router = require('../../client/router')

//console.log(Router)

try {
    var Navbar = React.createFactory(require('../../client/src/common/navbar'))
    console.log(React.renderToString(Navbar()))
} catch (e) {
}


/*
 Router.renderRoutesToString(routes, req.originalUrl).then(function(result) {
 res.send(result.html);
 }, function(result) {
 if (result.NOT_FOUND)
 res.send(404, result.html);
 else if (result.REDIRECT)
 res.redirect(result.redirectUrl);
 else
 // this would never happen in the client
 res.send(500, result.message);
 });
 */