const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',

  plugins: [new webpack.LoaderOptionsPlugin({debug: true})],

  devServer: {
    port: 8080,
    hot: true
  }
});
