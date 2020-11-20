/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  name: 'number-baseball-ts-config',
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
        test: /\.tsx?$/, // .ts or .tsx
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        enabled: true,
        files: ['client.tsx', './src/**/*']
      }
    })
  ],

  // 출력
  output: {
    publicPath: '/dist',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  }
};
