import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';

import './index.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,

  document.getElementById('root')
);
registerServiceWorker();
