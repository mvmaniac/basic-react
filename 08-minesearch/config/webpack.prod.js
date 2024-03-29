const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  // 개발모드에서 react-refresh와 같이 쓸 경우에는 공통이 아닌 모드별로 설정할 것...
  target: ['web', 'es5'],
});
