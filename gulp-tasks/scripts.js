// Pull-in specific version of webpack
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

module.exports = (gulp, $, paths) => {
  return () => {
    return gulp.src('src/assets/js/entry.js')
    .pipe($.changed(paths.scripts.build))
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe(webpackStream(require('../webpack.config.js'), webpack))
    .pipe(gulp.dest(paths.scripts.build));
  };
};
