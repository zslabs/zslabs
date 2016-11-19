import fs from 'fs';
import path from 'path';
import merge from 'merge-stream';

/**
 * Get sub-directories
 * @param  {path} dir
 * @return {file stream}
 */
function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter((file) => {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

module.exports = (gulp, $, paths) => {
  return () => {
    const globalIcons =
      // Combine SVGs from global folder in site and from framework src folder
      gulp.src([paths.svg.baseDir + '/global/*.svg', paths.svg.frameworkSrc])
      .pipe($.changed(paths.svg.build))
      .pipe($.svgSprite({
        'svg': {
          'xmlDeclaration': false,
          'doctypeDeclaration': false,
          'dimensionAttributes': false
        },
        'mode': {
          'symbol': {
            'dest': '',
            'sprite': 'global.svg'
          }
        }
      }))
      .pipe($.size({
        showFiles: true,
        title: 'SVG Sprite:'
      }))
      .pipe(gulp.dest(paths.svg.build));

    // Grab all folders from src directory
    const folders = getFolders(paths.svg.baseDir);

    // Run SVGO through subfolders for individual sprites
    const pageIcons = folders.filter((folder) => {
      // Remove `global` from returned array since we take care of it above
      // Merged with framework icons
      if (folder === 'global') {
        return false;
      }
      return true; }).map((folder) => {
        return gulp.src(path.join(paths.svg.baseDir, folder, '/*.svg'))
        .pipe($.changed(paths.svg.build))
        .pipe($.svgSprite({
          'svg': {
            'xmlDeclaration': false,
            'doctypeDeclaration': false,
            'dimensionAttributes': false
          },
          'mode': {
            'symbol': {
              'dest': '',
              'sprite': folder + '-sprite.svg'
            }
          }
        }))
        .pipe($.size({
          showFiles: true,
          title: folder + ' SVG Sprite:'
        }))
        .pipe(gulp.dest(paths.svg.build));
      });

    return merge(globalIcons, pageIcons);
  };
};
