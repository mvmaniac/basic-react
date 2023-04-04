import * as React from 'react';
import ReactDOM from 'react-dom/client';

import MineSearchHooks from './src/MineSearchHooks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
);

root.render(
  <React.StrictMode>
    <MineSearchHooks />
  </React.StrictMode>
);
