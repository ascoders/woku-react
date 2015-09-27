var webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8090',
        'webpack/hot/only-dev-server',
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
                loaders: ['jsx?harmony', 'react-hot', 'babel']
            }, {
                test: /\.scss/,
                loader: 'style!css!sass'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=256'
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