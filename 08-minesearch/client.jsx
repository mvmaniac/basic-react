import React from 'react';
import { render } from 'react-dom';

import { hot } from 'react-hot-loader/root';

import MineSearchHooks from './src/MineSearchHooks';
// import LottoHooks from './src/LottoHooks';

const Hot = hot(MineSearchHooks);
// const Hot = hot(LottoHooks);

render(<Hot />, document.querySelector('#root'));
