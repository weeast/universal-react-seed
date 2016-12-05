'use strict';

var assign = require('object-assign');
var path = require('path');

var webpack = require('webpack');
var glob = require('glob');

var extractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var env = require(path.resolve(__dirname,'../environments'));

module.exports = function makeClientDevelopmentConfig(config) {
    var extractCSS = new extractTextPlugin('css/[name].css',{allChunks:true});
    var cssLoader = extractCSS.extract(['css']);
    var lessLoader = extractCSS.extract(['css', 'less']);
    // var lessLoader = extractCSS.extract('style!css!less',['css', 'less']);
    //组件或插件入口js
    var componentsEntries = (function() {
        var componentsDir = env.inProject("app");
        // var pluginsDir = env.inSrc('scripts/plugins');
        var components = glob.sync(componentsDir + '/**/__unit__.js');
        // var projPlugins = glob.sync(pluginsDir + '/**/__unit__/index.js');
        // var totalEntries = components.concat(projPlugins);
        var _componentsId = 0;
        var map = {};

        //组件或插件入口html
        components.forEach(function(filePath) {
            var HmtlConfig = {
                template: 'html!' + env.inProject('server/views/component-unit.html'),
                inject: 'body',
                minify: false,
                chunks: ['vendor']
            };
            //获取组件或插件名
            var fileName = filePath.match(/\/[^\/]*\/__unit__.js$/);
            if (fileName)
                fileName = fileName[0].replace(/[\/](__unit__.js$)*/g, '');
            else
                fileName = 'chunks';
            //添加到webpack entry
            map[++_componentsId + '.test.' + fileName] = filePath;
            //输出路径
            var outPath = filePath.replace(env.inAPP().replace(/\\/g,'/'), '').replace(/\/__unit__.js$/, '');
            // outPath = outPath.replace(/\/__unit__.js$/, '');
            //添加到webpack html plugin配置
            HmtlConfig.filename = '__components__' + outPath + '.html';
            HmtlConfig.chunks.push(_componentsId + '.test.' + fileName);
            //添加到wepack plugin列表
            config.plugins.push(new HtmlWebpackPlugin(HmtlConfig));
        });

        return map;
    })();

    config.debug = true;
    config.displayErrorDetails = true;
    config.outputPathinfo = true;

    // 开发工具————原资源映射
    config.devtool = 'eval-source-map';//cheap-module-eval-source-map

    config.entry = assign(config.entry, componentsEntries);

    // 热替换入口配置
    // 多入口文件的情况，每一个入口文件都必须加上这个配置
    // 参见 https://github.com/glenjamin/webpack-hot-middleware 
    for (var key in config.entry) {
        if (!Array.isArray(config.entry[key])) {
            config.entry[key] = [config.entry[key]];
        }
        // config.entry[key].push(
        //     'webpack-dev-server/client?'+env.DEV_SERVER,
        //     'webpack/hot/only-dev-server'
        // );
        config.entry[key].push('webpack-hot-middleware/client?reload=true&path='+env.DEV_SERVER+'/__webpack_hmr');
    }
    
    config.output = {
        path: env.inProject('dist'),
        filename: '[name].js',
        chunkFilename: '[chunkhash:8].chunk.js',
        publicPath: env.PUBLIC_PATH,
    };

    if(env.HMRE){
        config.module.loaders[0].query = {
            "env": {
                "development": {
                    "presets": ["react-hmre"]
                }
            }
        };
    }
    
    config.module.loaders.push({
        test: /\.css$/,
        loader: cssLoader
    }, {
        test: /\.less$/,
        loader: lessLoader
    });

    config.plugins.push(
        extractCSS,
        new webpack.HotModuleReplacementPlugin(), //热替换
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filname: 'vendor.js'
        })
    );

    return config;
};