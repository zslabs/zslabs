const paths = {
  fonts: {
    src: 'src/assets/fonts/**/*',
    build: './dist/assets/fonts/',
  },
  media: {
    src: 'src/assets/media/**/*',
    build: './dist/assets/media/',
  },
  scripts: {
    entry: {
      site: './src/assets/js/entry.js',
    },
    src: 'src/assets/js/**/*.js',
    build: './dist/assets/js/',
  },
  svg: {
    baseDir: 'src/assets/icons',
    frameworkSrc: './node_modules/basey/src/assets/icons/*.svg',
    src: 'src/assets/icons/*.svg',
    build: './dist/assets/icons/',
  },
  styles: {
    src: 'src/assets/scss/**/*.scss',
    build: './dist/assets/css/',
  },
  pages: {
    src: ['src/templates/*.html', 'src/articles/**/*.md', 'src/pages/**/*.html'],
    build: './dist/',
  },
};

export default paths;
