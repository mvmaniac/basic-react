const path = require('path');

module.exports = {
  name: 'reactrouter-setting',
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
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      // https://github.com/browserslist/browserslist 참고
                      browsers: ['defaults']
                    },
                    debug: true
                  }
                ],
                '@babel/preset-react'
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                'react-hot-loader/babel'
              ]
            }
          }
        ]
      }
    ]
  },

  plugins: [],

  // 출력
  output: {
    publicPath: '/dist', // webpack-dev-server 때문에 사용함
    path: path.join(__dirname, '../dist'),
    filename: 'app.js'
  },

};
