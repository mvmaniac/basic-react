import * as React from 'react';
import ReactDOM from 'react-dom/client';

import TicTacToeHooks from './src/TicTacToeHooks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement,
);

root.render(
  <React.StrictMode>
    <TicTacToeHooks />
  </React.StrictMode>,
);
