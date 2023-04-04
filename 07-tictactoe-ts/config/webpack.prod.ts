import { merge } from 'webpack-merge';

import common from './webpack.common';

export default merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  // 개발모드에서 react-refresh와 같이 쓸 경우에는 공통이 아닌 모드별로 설정할 것...
  target: ['web', 'es5']
});
