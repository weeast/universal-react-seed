/*var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../../configs/webpack');
var config = require('../../configs/webpack-dev');
var port = 4001;

new WebpackDevServer(webpack(webpackConfig), config).listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Webpack dev server is listening at localhost:' + port);
});

*/// load native modules
var http = require('http')
var path = require('path')
var util = require('util')

// load 3rd modules
var koa = require('koa')
var cors = require('koa-cors')
var router = require('koa-router')()
var serve = require('koa-static')

var routes = require('./components.dev')

// init framework
var app = koa()

app.use(cors())

// global events listen
app.on('error', (err, ctx) => {
    err.url = err.url || ctx.request.url
    console.error(err.stack, ctx)
})

routes(router, app)
app.use(router.routes())

var webpackDevMiddleware = require('koa-webpack-dev-middleware')
var webpack = require('webpack')
var webpackConf = require('../../configs/webpack')
var compiler = webpack(webpackConf)
var config = require('../../configs/webpack-dev')
// 为使用Koa做服务器配置koa-webpack-dev-middleware
app.use(webpackDevMiddleware(compiler, config))

// 为实现HMR配置webpack-hot-middleware
var hotMiddleware = require('webpack-hot-middleware')(compiler)
// Koa对webpack-hot-middleware做适配
app.use(function* (next) {
    yield hotMiddleware.bind(null, this.req, this.res)
    yield next
})

app = http.createServer(app.callback())

app.listen(4001, '127.0.0.1', () => {
    var url = util.format('http://%s:%d', 'localhost', 4001)

    console.log('Listening at %s', url)
})