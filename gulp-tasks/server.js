import browserSync from 'browser-sync';

import paths from './paths';

export default function server() {
  browserSync.init({
    server: {
      baseDir: paths.pages.build
    }
  });
}
