import browserSync from 'browser-sync';

module.exports = () => {
  return () => {
    browserSync.init({
      server: {
        baseDir: "./dist/"
      }
    });
  };
};
