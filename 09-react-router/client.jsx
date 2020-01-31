import React from 'react';
import { render } from 'react-dom';

import { hot } from 'react-hot-loader/root';

import Games from './src/Games';

const Hot = hot(Games);

render(<Hot />, document.querySelector('#root'));
