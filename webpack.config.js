import webpack from 'webpack';
import path from 'path';

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: 'source-map',
  entry: {
    entry: './src/assets/js/entry'
  },
  output: {
    filename: '[name].js'
  },
  externals: {
    TweenLite: 'TweenLite',
    jQuery: 'jQuery',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/assets/js'),
          path.resolve(__dirname, 'node_modules/basey')
        ],
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: {
      basey: path.resolve(__dirname, 'node_modules/basey/src/assets/js'),
    },
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
