module.exports = (gulp, $) => {
  return () => {
    return gulp.src('./dist/**/*')
    .pipe($.ghPages({
      'remoteUrl': 'git@github.com:zslabs/zslabs.github.io.git'
    }));
  };
};
