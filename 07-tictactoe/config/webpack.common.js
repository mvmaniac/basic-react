const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const babelLoaderOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          // https://github.com/browserslist/browserslist 참고
          browsers: ['defaults']
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: ['@babel/plugin-proposal-class-properties']
};

module.exports = {
  // 확장할 속성 정의
  expansion: {babelLoaderOptions},
  // 실제 webpack 설정
  config: {
    name: 'tic-tac-toe-config',
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
              options: babelLoaderOptions
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
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js'
    }
  }
};
