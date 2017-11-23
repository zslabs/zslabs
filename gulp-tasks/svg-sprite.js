import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import merge from 'lodash.merge';

import paths from './paths';

const packages = merge(
  require('basey/package.json'),
  require('../package.json'),
);

const $ = gulpLoadPlugins({
  config: packages,
});

export default function svgSprite() {
  return gulp.src(paths.svg.src)
    .pipe($.changed(paths.svg.build))
    .pipe($.svgSprite({
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
        dimensionAttributes: false,
      },
      shape: {
        transform: [{
          svgo: {
            plugins: [
              { cleanupIDs: false },
              { convertShapeToPath: false },
              { mergePaths: false },
              // { removeAttrs: { attrs: '(fill|stroke.*)' } },
              { removeAttrs: { attrs: '(stroke)' } },
            ],
          },
        }],
      },
      mode: {
        symbol: {
          dest: '',
          sprite: 'sprite.svg',
        },
      },
    }))
    .pipe($.size({
      showFiles: true,
      title: 'SVG sprite:',
    }))
    .pipe(gulp.dest(paths.svg.build));
}
