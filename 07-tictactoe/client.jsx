import React from 'react';
import {render} from 'react-dom';

import {hot} from 'react-hot-loader/root';

import TicTacToeHooks from './src/TicTacToeHooks';

const Hot = hot(TicTacToeHooks);

render(<Hot />, document.querySelector('#root'));
