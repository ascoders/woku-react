var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: [
        './client/main.js'
    ],
    output: {
        path: __dirname + '/client/static/',
        publicPath: '/client/static/',
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['jsx', 'babel']
            }, {
                test: /\.(scss|css)/,
                loader: ExtractTextPlugin.extract("style", "css!autoprefixer!sass")
            }, {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=8192'
            }, {
                test: /\.woff$/,
                loader: "url?limit=10000&minetype=application/font-woff"
            }, {
                test: /\.ttf$/,
                loader: "file"
            }, {
                test: /\.eot$/,
                loader: "file"
            }, {
                test: /\.svg$/,
                loader: "file"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("main.css", {allChunks: true})
    ]
}