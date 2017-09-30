import webpack from 'webpack';
import merge from 'lodash.merge';
import gulpLoadPlugins from 'gulp-load-plugins';

import webpackConfig from '../webpack.config.js';

const packages = merge(
  require('basey/package.json'),
  require('../package.json')
);
const $ = gulpLoadPlugins({
  config: packages
});

export default function scripts(callback) {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new $.util.PluginError('[webpack:build]', err);
    }

    $.util.log('[webpack:build] Completed\n' + stats.toString({
      assets: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      colors: true,
      hash: false,
      timings: false,
      version: false
    }));

    callback();
  });
}
