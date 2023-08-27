import React from 'react';
import ReactDOM from 'react-dom/client';

// import RockPaperScissorsClass from './src/RockPaperScissorsClass';
import RockPaperScissorsHooks from './src/RockPaperScissorsHooks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RockPaperScissorsHooks />
  </React.StrictMode>,
);
