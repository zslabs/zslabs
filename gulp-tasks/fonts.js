module.exports = (gulp, $, paths) => {
  return () => {
    return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.build))
    .pipe($.duration('moving fonts'));
  };
};
