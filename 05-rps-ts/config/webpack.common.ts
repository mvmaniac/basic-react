import * as path from 'path';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration } from 'webpack';

const commonConfig: Configuration = {
  name: 'rps-ts-config',
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts']
  },

  // 입력
  entry: {
    app: ['./client']
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/, // .ts or .tsx or .js or .jsx
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {}
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin.CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ],

  // 출력
  output: {
    publicPath: '/dist',
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  }
};

export default commonConfig;
