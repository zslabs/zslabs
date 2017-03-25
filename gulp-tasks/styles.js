import gulp from 'gulp';
import browserSync from 'browser-sync';
import merge from 'lodash.merge';
import gulpLoadPlugins from 'gulp-load-plugins';

// PostCSS Processors
import pImport from 'postcss-import';
import flexboxFixes from 'postcss-flexbugs-fixes';
import autoprefixer from 'autoprefixer';
import size from 'postcss-size';
import easings from 'postcss-easings';
import svgFragments from 'postcss-svg-fragments';
import assets from 'postcss-assets';
import sorting from 'postcss-sorting';

import paths from './paths';

const packages = merge(
  require('basey/package.json'),
  require('../package.json')
);
const $ = gulpLoadPlugins({
  config: packages
});
const autoprefixerInit = autoprefixer({
  browsers: ['last 2 versions']
});
const processors  = [
  pImport,
  flexboxFixes,
  autoprefixerInit,
  size,
  easings,
  svgFragments,
  assets,
  sorting
];

export default function styles() {
  return gulp.src('src/assets/scss/*')
  .pipe($.changed(paths.styles.build))
  .pipe($.sourcemaps.init())
  .pipe($.sass().on('error', function(err) {
    // Show error in console
    console.error(err.message);
    // Display error in the browser
    browserSync.notify(err.message, 3000);
    // Prevent gulp from catching the error and exiting the watch process
    this.emit('end');
  }))
  .pipe($.postcss(processors))
  .pipe($.cssnano({
    discardUnused: false,
    zindex: false,
    reduceIdents: false,
    mergeIdents: false
  }))
  .pipe($.sourcemaps.write('./'))
  .pipe($.size({
    showFiles: true,
    title: 'Styles:'
  }))
  .pipe(gulp.dest(paths.styles.build))
  .pipe(browserSync.stream({match: '**/*.css'}))
  .pipe($.duration('building styles'));
}
