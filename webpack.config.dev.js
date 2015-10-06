var webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8090',
        'webpack/hot/only-dev-server',
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
                loaders: ['jsx', 'react-hot', 'babel']
            }, {
                test: /\.(scss|css)/,
                loader: 'style!css!autoprefixer!sass'
            }, {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url?limit=256'
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}