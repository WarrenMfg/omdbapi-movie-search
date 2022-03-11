import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import './index.css';

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
