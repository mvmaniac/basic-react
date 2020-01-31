import React from 'react';
import { render } from 'react-dom';

import { hot } from 'react-hot-loader/root';

// import RockPaperScissorsClass from './src/RockPaperScissorsClass';
import RockPaperScissorsHooks from './src/RockPaperScissorsHooks';

// const Hot = hot(RockPaperScissorsClass);
const Hot = hot(RockPaperScissorsHooks);

render(<Hot />, document.querySelector('#root'));
