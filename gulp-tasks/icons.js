const { exec } = require('child_process');

export default function buildSVGs(cb) {
  exec('./node_modules/.bin/babel-node ./gulp-tasks/icons/index.js', (err) => {
    console.log('Icon build file generated successfully'); // eslint-disable-line no-console

    cb(err);
  });
}
