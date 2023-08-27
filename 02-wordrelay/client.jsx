import React from 'react';
import ReactDOM from 'react-dom/client';

// import WordRelayClass from './src/WordRelayClass';
import WordRelayHooks from './src/WordRelayHooks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WordRelayHooks />
  </React.StrictMode>,
);
