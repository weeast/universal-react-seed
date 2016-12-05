/**
 * 组件测试入口
 * @authors weeast (weeast.cd@gmail.com)
 * @date    2016-11-01 16:04:02
 */

var render = require('koa-ejs');
var glob = require('glob');
var path = require('path');

var env = require('../../configs/environments');

module.exports = function(router, app) {

    render(app, {
        root: path.resolve(__dirname, '..', 'views'),
        layout: false,
        viewExt: 'ejs',
        cache: false,
        debug: true
    });

    // 组件入口
    router.get('/__components__', function*(){
        var rootPath = env.inAPP().replace(/\\/g,'/')

        // 组件单元路径
        var compsPath = glob.sync(env.inAPP('components/**/__unit__.js'))
        var routeCompsPath = glob.sync(env.inAPP('routes/**/__unit__.js'))

        // 组件入口路径
        var comps = compsPath.map(function(compPath){
            return compPath.replace(rootPath, '').replace(/\/__unit__.js$/, '')
        })
        var routeCompsArr = routeCompsPath.map(function(routePath){
            return routePath.replace(rootPath, '').replace(/\/__unit__.js$/, '')
        })

        // 路由组件文件结构解析
        var routeComps = {}
        routeCompsArr.map( function(routePath){
            var routeArr = routePath.split(/\/container\/|\/components\//)
            var route = routeArr[0], routeComp = routeArr[1];

            routeComps[route] = routeComps[route] || {};
            routeComps[route][routeComp] = routePath;
        })

        yield this.render('unit', { comps:comps, routeComps:routeComps })
    })
}