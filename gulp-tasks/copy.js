module.exports = (gulp) => {
  return () => {
    return gulp.src(['./CNAME', './src/favicon.ico'])
    .pipe(gulp.dest('./dist/'));
  };
};
