'use strict';

var assign = require('object-assign');
var path = require('path');

var webpack = require('webpack');
var glob = require('glob');

var extractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var env = require(path.resolve(__dirname,'../environments'));

function makeDefaultConfig() {
    return {
        entry: {
            app: './app/app',
            //公共库
            vendor: env.VENDOR_DEPENDENCIES
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel'
                },
                {
                    test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                    loaders: [
                        'url?limit=10000&name=img/[hash:8].[name].[ext]',
                        'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
                    ]
                }, {
                    test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|otf)$/,
                    loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(env)
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            /* 自动植入
            new webpack.ProvidePlugin({
                React: "react",
                Promise: "promise"
            }),*/
            /*new commonsChunkPlugin({
                name: 'commons',
                filename: 'js/[hash:8].commons.min.js',
                minChunk: 3
            }),*/
        ],
        resolve: {
            root: [ env.inProject("app") ],
            alias:  env.ALIAS,
            extensions: ['', '.js', '.jsx']
        },
        resolveLoader: {
            root: env.inNodeMod()
        }
    }
}

module.exports = function makeConfig(configModifier) {
    return assign({}, makeDefaultConfig(), configModifier);
};