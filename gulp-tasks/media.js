import gulp from 'gulp';
import merge from 'lodash.merge';
import gulpLoadPlugins from 'gulp-load-plugins';

import paths from './paths';

const packages = merge(
  require('basey/package.json'),
  require('../package.json'),
);

const $ = gulpLoadPlugins({
  config: packages,
});

export default function media() {
  return gulp.src(paths.media.src)
    .pipe($.changed(paths.media.build))
    .pipe($.imagemin())
    .pipe($.size({
      showFiles: true,
      title: 'Media:',
    }))
    .pipe(gulp.dest(paths.media.build))
    .pipe($.duration('compressing media'));
}
