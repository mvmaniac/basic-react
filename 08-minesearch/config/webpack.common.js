const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  name: 'mine-search-config',
  resolve: {
    extensions: ['.jsx', '.js']
  },

  // 입력
  entry: {
    app: ['./client']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/, // .js or .jsx
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
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['.jsx', '.js']
    })
  ],

  // 출력
  output: {
    publicPath: '/dist',
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  }
};
