const webpack = require('webpack');
const path = require('path');

const extractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var env = require(path.resolve(__dirname,'../environments'));

module.exports = function makeClientDevelopmentConfig(config) {
    var extractCSS = new extractTextPlugin('css/[contenthash:8].[name].min.css');
    var cssLoader = extractCSS.extract(['css?minimize']);
    var lessLoader = extractCSS.extract(['css?minimize', 'less']);

    config.output = {
        path: env.inProject("dist"),
        filename: 'js/[chunkhash:8].[name].min.js',
        chunkFilename: 'js/[chunkhash:8].chunk.min.js',
        publicPath: env.PUBLIC_PATH
    };

    config.module.loaders.push({
        test: /\.css$/,
        loader: cssLoader
    }, {
        test: /\.less$/,
        loader: lessLoader
    });

    config.plugins.push(
        extractCSS,
        new HtmlWebpackPlugin({
            template: 'html!./app/views/index.ejs',
            filename: 'views/index.ejs',
            inject: 'body',
            minify: false,
            chunks: ['vendor','app']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            mangle: {
                except: ['$', 'exports', 'require']
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filname: '[name].[chunkhash].js'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin()
    )

    return config;
}