import gulp from 'gulp';
import reporter from 'postcss-reporter';
import stylelint from 'stylelint';
import scss from 'postcss-scss';
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

export default function linter() {
  return gulp.src(paths.styles.src)
    .pipe($.postcss(
      [
        stylelint(),
        reporter({ clearMessages: true })
      ],
      {
        syntax: scss
      }
    ))
    .pipe($.duration('linting styles'));
}
