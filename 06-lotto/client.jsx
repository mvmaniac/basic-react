import React from 'react';
import { render } from 'react-dom';

import { hot } from 'react-hot-loader/root';

// import LottoClass from './src/LottoClass';
import LottoHooks from './src/LottoHooks';

// const Hot = hot(LottoClass);
const Hot = hot(LottoHooks);

render(<Hot />, document.querySelector('#root'));
