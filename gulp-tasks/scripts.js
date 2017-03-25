import gulp from 'gulp';
// Pull-in specific version of webpack
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import merge from 'lodash.merge';
import gulpLoadPlugins from 'gulp-load-plugins';

import paths from './paths';

const packages = merge(
  require('basey/package.json'),
  require('../package.json')
);
const $ = gulpLoadPlugins({
  config: packages
});

export default function scripts() {
  return $.eslint()
  .pipe($.eslint.format())
  .pipe(webpackStream(require('../webpack.config.js'), webpack))
  .pipe(gulp.dest(paths.scripts.build));
}
