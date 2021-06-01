const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {merge, mergeWithRules} = require('webpack-merge');
const common = require('./webpack.common');

const configMerge = merge(common, {
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
        test: /\.jsx?$/, // .js or .jsx
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-refresh/babel']
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
