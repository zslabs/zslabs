import gulp from 'gulp';
import browserSync from 'browser-sync';

import paths from './paths';

const { reload } = browserSync;

export default function watch() {
  gulp.watch(paths.styles.src, ['styles']);
  gulp.watch(paths.scripts.src, ['scripts', reload]);
  gulp.watch(paths.media.src, ['media', reload]);
  gulp.watch(paths.pages.src, ['pages']);
  // Stop old version of gulp watch from running when modified
  gulp.watch(['gulpfile.babel.js', './gulp-tasks/*', 'webpack.config.js']).on('change', () => process.exit(0));
}
