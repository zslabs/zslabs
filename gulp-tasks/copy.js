import gulp from 'gulp';

import paths from './paths';

export default function copy() {
  return gulp.src(['./CNAME'])
  .pipe(gulp.dest(paths.pages.build));
}
