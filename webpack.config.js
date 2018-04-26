import webpack from 'webpack';
import path from 'path';

import paths from './gulp-tasks/paths';

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: nodeEnv === 'production' ? 'source-map' : 'eval',
  entry: paths.scripts.entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, paths.scripts.build),
  },
  externals: {
    TweenLite: 'TweenLite',
  },
  // Don't attempt to continue if there are any errors.
  bail: true,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src/assets/js'),
          path.resolve(__dirname, 'node_modules/basey'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
    ],
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      basey: path.resolve(__dirname, 'node_modules/basey/src/assets/js'),
    },
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
  ],
};
