/* eslint-disable @typescript-eslint/no-var-requires */
const ReactRefreshTypescript = require('react-refresh-typescript');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const {merge, mergeWithRules} = require('webpack-merge');
const config = require('./webpack.common');

const mergeConfig = merge(config, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',

  plugins: [new ReactRefreshWebpackPlugin()],

  devServer: {
    publicPath: '/dist',
    port: 8080,
    hot: true
  }
});

const devRules = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [ReactRefreshTypescript.default()]
              })
            }
          }
        ]
      }
    ]
  }
};

module.exports = mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: {
        loader: 'match',
        options: 'replace'
      }
    }
  }
})(mergeConfig, devRules);
