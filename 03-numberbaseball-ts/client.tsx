import * as React from 'react';
import ReactDOM from 'react-dom/client';

// import NumberBaseballClass from './src/NumberBaseballClass';
import NumberBaseballHooks from './src/NumberBaseballHooks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
);

root.render(
  <React.StrictMode>
    <NumberBaseballHooks />
  </React.StrictMode>
);
