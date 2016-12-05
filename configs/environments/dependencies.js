var path = require("path")

module.exports = exports = {
  plugins: [],
  vendors: [
    'react',
    'react-router',
    'redux',
    'react-dom',
    'lodash',
    'bluebird',
    'humps',
    'history'
  ],
  aliases: {
    APP: path.resolve(__dirname, '../..', 'app'),
    SERVER: path.resolve(__dirname, '../..', 'server'),
    ROOT: path.resolve(__dirname, '../..'),
    STYLE: path.resolve(__dirname, '../..', 'app/styles')
  }
};