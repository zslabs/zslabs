import fs from 'fs';
import util from 'util';
import path from 'path';

/**
 * Get built file modification times
 * @return {object}
 */
export function fileModTimes(builtFiles) {
  const built = [];

  builtFiles.forEach((value) => {
    // Create key based off of filename
    const parts = value.split('/');
    const key = parts.pop();

    built[key] = '';

    // Attempt to read file
    fs.readFile(value, 'utf8', (err) => {
      // If we find the file
      if (!err) {
        fs.stat(value, (error, stats) => {
          // Get modification time of file
          const mtime = new Date(util.inspect(stats.mtime));

          built[key] = Date.parse(mtime);
        });
      } else {
        // Generate a random number group in the event this is the first build
        built[key] = Math.random().toString().slice(2, 12);
      }
    });
  });

  return built;
}

/**
 * Get top-level directories
 * @param  {string} srcPath
 * @return array
 */
export function getDirectories(srcPath) {
  return fs.readdirSync(srcPath)
    .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}
