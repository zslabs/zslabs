module.exports = (gulp) => {
  return () => {
    return gulp.src(['./CNAME'])
    .pipe(gulp.dest('./dist/'));
  };
};
