var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: [
        './src/main.js'
    ],
    output: {
        path: __dirname + '/static/publish/',
        publicPath: '/static/publish/',
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['jsx?harmony', 'babel']
            }, {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract("style", "css!sass")
            }, {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ]
}