'use strict';

process.env.NODE_ENV = (process.env.NODE_ENV || 'development').trim();

var vendors = require('./dependencies').vendors;
var aliases = require('./dependencies').aliases;

var resolve = require('path').resolve;
var argv = require('yargs').argv;
var _slice = [].slice;

var DIR_NODEMOD = 'node_modules';
var DIR_SERVER = 'server';
var DIR_APP = 'app';
var DEV_SERVER = 'http://localhost:' + (process.env.PORT || 4001)
// 设置打包后的node运行路径
if( !process.env.NODE_PATH )  process.env.NODE_PATH = resolve(__dirname, '../../');

var PROJECT_PATH = process.env.NODE_PATH;//resolve(__dirname, '../../');
var PUBLIC_PATH = process.env.NODE_ENV === 'production'?'':DEV_SERVER+'/static/'; // production public path
var PROXY_ADDR = 'lol.766.com'; // proxy backend address
var SOCKET_NSP = "/socket.io";
var SOCKET_SERVER = "http://localhost:"+(process.env.PORT || 4000)+SOCKET_NSP;

var ICESERVER = {
  "iceServers": [{
    "url": "stun:stun.l.google.com:19302"
  }]
}

function inProject() {
  return resolve.apply(resolve, [PROJECT_PATH].concat(_slice.apply(arguments)));
}

// ------------------------------------
// Configuration Definition
// ------------------------------------
module.exports = exports = {

  // environment
  NODE_ENV: process.env.NODE_ENV,
  __PROD__: process.env.NODE_ENV === 'production',
  __DEV__: process.env.NODE_ENV === 'development',
  __DEBUG__: process.env.NODE_ENV === 'development' && !!argv.debug,

  // path helpers
  DIR_NODEMOD: DIR_NODEMOD,
  PROJECT_PATH: PROJECT_PATH,
  inProject: inProject,
  inAPP: inProject.bind(undefined, DIR_APP),
  inServer: inProject.bind(undefined, DIR_SERVER),
  inNodeMod: inProject.bind(undefined, DIR_NODEMOD),

  // build system 
  VENDOR_DEPENDENCIES: vendors,
  ALIAS: aliases,

  // server configuration
  // WEBPACK_PORT: 3000,
  SERVER_PORT: process.env.PORT || 4000,
  SOCKET_SERVER: SOCKET_SERVER,
  SOCKET_NSP: SOCKET_NSP,
  DEV_SERVER: DEV_SERVER,
  PUBLIC_PATH: PUBLIC_PATH,
  PROXY_ADDR: PROXY_ADDR,
  ICESERVER: ICESERVER
};