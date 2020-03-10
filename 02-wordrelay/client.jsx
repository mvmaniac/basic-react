import React from 'react';
import {render} from 'react-dom';

import {hot} from 'react-hot-loader/root';

import WordRelayClass from './src/WordRelayClass';
import WordRelayHooks from './src/WordRelayHooks';

const Hot = hot(WordRelayHooks);

render(<Hot />, document.querySelector('#root'));
