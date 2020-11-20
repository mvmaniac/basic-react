/* eslint-disable @typescript-eslint/no-var-requires */
const {merge} = require('webpack-merge');
const config = require('./webpack.common');

module.exports = merge(config, {
  mode: 'production',
  devtool: 'hidden-source-map'
});
