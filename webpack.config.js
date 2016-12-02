const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'production';
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    entry: './src/assets/js/entry'
  },
  output: {
    filename: '[name].js'
  },
  externals: {
    'TweenLite': 'TweenLite',
    'jquery': 'jQuery'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/assets/js'),
          path.resolve(__dirname, 'node_modules/float')
        ],
        loader: 'babel-loader',
        query: {
          presets: [
            ['es2015', { 'modules': false }]
          ],
          compact: false
        }
      }
    ]
  },
  plugins: [
    // uglify js
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: true
    }),
    // env plugin
    new webpack.DefinePlugin({
      'proccess.env': { NODE_ENV: JSON.stringify(nodeEnv)}
    })
  ]
};
