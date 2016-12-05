var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var env = require(path.resolve(__dirname,'../environments'));

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: path.resolve(__dirname,'../..','server/server.js'),
  target: 'node',
  output: {
    path: path.resolve( __dirname,'../..','dist'),
    filename: 'server.js'
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
        loader: [
            'url?limit=10000&name=img/[hash:8].[name].[ext]',
            'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
        ]
      }, 
      {
        test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|otf)$/,
        loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
      }
    ]
  },
  externals: nodeModules,
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\.(css|less)$/, 'react'),
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ],
  resolve:{ root:[ env.inProject("app") ],  alias:  env.ALIAS },
  resolveLoader: {root: env.inNodeMod()},
  process: true,
  __filename: true,
  __dirname: true,
  devtool: 'sourcemap'
}