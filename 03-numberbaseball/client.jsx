import React from 'react';
import ReactDOM from 'react-dom/client';

// import NumberBaseballClass from './src/NumberBaseballClass';
import NumberBaseballHooks from './src/NumberBaseballHooks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NumberBaseballHooks />
  </React.StrictMode>,
);
