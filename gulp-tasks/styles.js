import browserSync from 'browser-sync';

// PostCSS Processors
import pImport from 'postcss-import';
import flexboxFixes from 'postcss-flexbugs-fixes';
import autoprefixer from 'autoprefixer';
import size from 'postcss-size';
import easings from 'postcss-easings';
import svgFragments from 'postcss-svg-fragments';
import assets from 'postcss-assets';
import sorting from 'postcss-sorting';

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

module.exports = (gulp, $, paths) => {
  return () => {
    return gulp.src('src/assets/scss/*')
    .pipe($.changed(paths.styles.build))
    .pipe($.plumber({
      handleError: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.postcss(processors))
    .pipe($.cssnano({
      discardUnused: false,
      zindex: false,
      reduceIdents: false,
      mergeIdents: false
    }))
    .pipe($.sourcemaps.write('../sourcemaps'))
    .pipe($.size({
      showFiles: true,
      title: 'Styles:'
    }))
    .pipe(gulp.dest(paths.styles.build))
    .pipe(browserSync.stream({match: '**/*.css'}))
    .pipe($.duration('building styles'));
  };
};
