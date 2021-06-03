import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import {Configuration as WebpackConfiguration} from 'webpack';
import {Configuration as WebpackDevServerConfiguration} from 'webpack-dev-server';
import {merge, mergeWithRules, CustomizeRule} from 'webpack-merge';

import common from './webpack.common';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const baseDevConfig: Configuration = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',

  plugins: [new ReactRefreshWebpackPlugin()],

  devServer: {
    publicPath: '/dist',
    port: 8080,
    hot: true
  }
};

const mergeConfig = merge<Configuration>(common, baseDevConfig);
const extendDevConfig: Configuration = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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

export default mergeWithRules({
  module: {
    rules: {
      test: CustomizeRule.Match,
      use: {
        loader: CustomizeRule.Match,
        options: CustomizeRule.Replace
      }
    }
  }
})(mergeConfig, extendDevConfig);
