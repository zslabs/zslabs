import gulp from 'gulp';
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

export default function deploy() {
  return gulp.src(`${paths.pages.build}**/*`)
  .pipe($.ghPages({
    'remoteUrl': 'git@github.com:zslabs/zslabs.github.io.git'
  }));
}
