import React from 'react';
import {render} from 'react-dom';

import {hot} from 'react-hot-loader/root';
import NumberBaseballClass from './src/NumberBaseballClass';
// import NumberBaseballHooks from './src/NumberBaseballHooks';

const Hot = hot(NumberBaseballClass);
// const Hot = hot(NumberBaseballHooks);

render(<Hot />, document.querySelector('#root'));
