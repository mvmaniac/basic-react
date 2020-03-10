import React from 'react';
import {render} from 'react-dom';

import {hot} from 'react-hot-loader/root';

// import ResponseCheckClass  from './src/ResponseCheckClass';
import ResponseCheckHooks from './src/ResponseCheckHooks';

// const Hot = hot(ResponseCheckClass);
const Hot = hot(ResponseCheckHooks);

render(<Hot />, document.querySelector('#root'));
