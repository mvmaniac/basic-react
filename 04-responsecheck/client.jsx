import React from 'react';
import ReactDOM from 'react-dom/client';

// import ResponseCheckClass from './src/ResponseCheckClass';
import ResponseCheckHooks from './src/ResponseCheckHooks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ResponseCheckHooks />
  </React.StrictMode>
);
