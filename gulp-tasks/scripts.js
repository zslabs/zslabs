import webpack from 'webpack';
import PluginError from 'plugin-error';
import log from 'fancy-log';

import webpackConfig from '../webpack.config.js';

export default function scripts(callback) {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new PluginError('[webpack:build]', err);
    }

    log(`[webpack:build] Completed\n${stats.toString({
      assets: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      colors: true,
      hash: false,
      timings: false,
      version: false,
      errorDetails: true,
    })}`);

    callback();
  });
}
