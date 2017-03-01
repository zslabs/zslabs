// Pull-in specific version of webpack
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

module.exports = (gulp, $, paths) => {
  return () => {
    return $.eslint()
    .pipe($.eslint.format())
    .pipe(webpackStream(require('../webpack.config.js'), webpack))
    .pipe(gulp.dest(paths.scripts.build));
  };
};
