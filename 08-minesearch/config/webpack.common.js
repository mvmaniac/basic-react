const path = require('path');

module.exports = {
  name: 'minesearch-setting',
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
                    }
                  }
                ],
                '@babel/preset-react'
              ],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        ]
      }
    ]
  },

  plugins: [],

  // 출력
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.js'
  }
};
