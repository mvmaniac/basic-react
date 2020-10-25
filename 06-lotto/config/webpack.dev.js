const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const {merge, mergeWithRules} = require('webpack-merge');
const common = require('./webpack.common');

const configMerge = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',

  plugins: [
    new webpack.LoaderOptionsPlugin({debug: true}),
    new ReactRefreshWebpackPlugin()
  ],

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
        test: /\.jsx?$/, // .js or .jsx
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {browsers: ['defaults']},
                    debug: true
                  }
                ],
                '@babel/preset-react'
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                'react-refresh/babel'
              ]
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
})(configMerge, devRules);
