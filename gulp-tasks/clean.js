import del from 'del';

import paths from './paths';

export default function clean() {
  return del(paths.pages.build);
}
