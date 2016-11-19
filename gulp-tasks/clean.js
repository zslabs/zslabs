import del from 'del';

module.exports = (gulp, $, paths) => {
  return () => {
    return del(paths.pages.build);
  };
};
