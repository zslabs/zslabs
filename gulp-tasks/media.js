module.exports = (gulp, $, paths) => {
  return () => {
    return gulp.src(paths.media.src)
    .pipe($.changed(paths.media.build))
    .pipe($.imagemin())
    .pipe($.size({
      showFiles: true,
      title: 'Media:'
    }))
    .pipe(gulp.dest(paths.media.build))
    .pipe($.duration('compressing media'));
  };
};
