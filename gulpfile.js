var gulp = require('gulp'),
  nodemon = require('nodemon'),
  webpack = require('webpack'),
  gutil = require('gulp-util'),
  argv = require('yargs').argv,
  path = require('path'),
  open = require('open'),
  $ = require('gulp-load-plugins')({ camelize: true }),
  runSequence = require('run-sequence'),
  serverConfig = require('./configs/webpack/server.config'),
  webpackConf = require('./configs/webpack/build.config')('production'),
  env = require('./configs/environments');

function onBuild(done) {
  return function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err)

    gutil.log('[webpack]', stats.toString({
        colors: true
    }))

    gutil.log(argv)
    
    if (done)
      done()
  }
}

gulp.task('backend:build', function(done) {
  webpack(serverConfig).run(onBuild(done));
});

gulp.task('backend:watch', function() {
  webpack(serverConfig).watch(100, function(err, stats) {
    onBuild()(err, stats);
    nodemon.restart();
  });
});

gulp.task('open', ['nodemon'], function(){
  open(env.DEV_SERVER+"/__components__");
})

gulp.task('nodemon',['backend:watch'], function() {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'dist/server'),
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop',
    // env: { 'NODE_PATH': path.join(__dirname, 'app')}
  }).on('restart', function() {
    gutil.log('Restarted!');
  });
});

gulp.task('run', ['open']);

gulp.task('pack', function(done) {
    webpack(webpackConf, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err)
        gutil.log('[webpack]', stats.toString({
            colors: true
        }))
        gutil.log(argv)
        done()
    })
})