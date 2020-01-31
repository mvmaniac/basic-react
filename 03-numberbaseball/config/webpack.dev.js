const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'cheap-eval-sourcemap',

  plugins: [new webpack.LoaderOptionsPlugin({debug: true})],

  devServer: {
    port: 8080,
    hot: true
  }
});
