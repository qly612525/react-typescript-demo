const webpack = require('webpack');
const config = require('./webpack.common.config');

// const HtmlWebpackPlugin = require('html-webpack-plugin');

delete config.devtool;
config.plugins = [
    // new HtmlWebpackPlugin(),
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
    // new webpack.DefinePlugin({
    //     ENV: '"dist"',
    //     'process.env': {
    //         NODE_ENV:JSON.stringify('production')
    //     }
    // })
];

module.exports = config;