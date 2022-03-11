import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import GlobalStore from './components/GlobalStore/GlobalStore';
import Layout from './components/Layout/Layout';
import Routes from './components/Routes/Routes';

import './index.css';

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <GlobalStore>
        <BrowserRouter>
          <Layout>
            <Routes />
          </Layout>
        </BrowserRouter>
      </GlobalStore>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
