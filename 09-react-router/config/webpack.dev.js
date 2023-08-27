const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge, mergeWithRules } = require('webpack-merge');
const common = require('./webpack.common');

const mergeConfig = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',

  plugins: [new ReactRefreshWebpackPlugin()],

  devServer: {
    static: {
      directory: path.join(__dirname, '../'),
    },
    port: 8080,
    hot: true,
    liveReload: false,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    devMiddleware: {
      publicPath: '/dist',
    },
  },
});

const extendDevConfig = {
  module: {
    rules: [
      {
        test: /\.jsx?$/, // .js or .jsx
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-refresh/babel'],
            },
          },
        ],
      },
    ],
  },
};

module.exports = mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: {
        loader: 'match',
        options: 'replace',
      },
    },
  },
})(mergeConfig, extendDevConfig);
