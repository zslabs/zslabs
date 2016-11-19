import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import paths from './gulp-tasks/paths.json';
import nunjucks from 'nunjucks';
import merge from 'lodash.merge';

const packages = merge(
  require('float/package.json'),
  require('./package.json')
);

// Utilities
const $ = gulpLoadPlugins({
  config: packages
});
const reload = browserSync.reload;

// https://github.com/superwolff/metalsmith-layouts/issues/43
nunjucks.configure(['./src/templates', './dist/assets/icons', './dist/assets/media'], {
  watch: false,
  noCache: true
});

/**
 * Reusable function for including tasks in subfolders
 * @param  {string} task
 * @return {task}
 */
function getTask(task) {
  return require(`./gulp-tasks/${task}`)(gulp, $, paths);
}

// Clean
gulp.task('clean', getTask('clean'));
// Copy
gulp.task('copy', getTask('copy'));
// Deploy
gulp.task('deploy', getTask('deploy'));
// BrowserSync
gulp.task('browser-sync', getTask('browser-sync'));
// Styles lint
gulp.task('stylelint', getTask('stylelint'));
// Styles
gulp.task('styles', ['svg-sprite', 'media', 'stylelint'], getTask('styles'));
// Scripts
gulp.task('scripts', getTask('scripts'));
// Media
gulp.task('media', getTask('media'));
// SVG Sprite
gulp.task('svg-sprite', getTask('svg-sprite'));
// Pages
gulp.task('pages', ['svg-sprite'], getTask('pages'));

// Bundled Tasks
gulp.task('default', [
  'copy',
  'svg-sprite',
  'scripts',
  'stylelint',
  'media',
  'styles',
  'pages'
]);

// Watch
gulp.task('watch', ['browser-sync'], () => {
  // Styles
  gulp.watch(paths.styles.src, ['styles']);
  // Scripts
  gulp.watch(paths.scripts.src, ['scripts', reload]);
  // Media
  gulp.watch(paths.media.src, ['media', reload]);
  // SVG Sprite
  gulp.watch(paths.svg.src, ['svg-sprite', reload]);
  // Pages
  gulp.watch(paths.pages.src, ['pages']);
});
