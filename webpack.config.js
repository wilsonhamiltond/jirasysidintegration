var webpack = require("webpack")

module.exports = {
    entry: './site/index.js',
    output: {
        path: __dirname,
        filename: "./dist/client.js"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    module: {
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
        }
    ]
    }
};