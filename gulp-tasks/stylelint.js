import reporter from 'postcss-reporter';
import stylelint from 'stylelint';
import scss from 'postcss-scss';

module.exports = (gulp, $) => {
  return () => {
    return gulp.src([
      'src/assets/css/**/*.scss'
    ])
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
  };
};
