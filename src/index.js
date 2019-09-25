import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ExampleUsingChildrenRefs } from 'components/ActionableDropdownUsingChildrenRefs';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';

import './index.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <ExampleUsingChildrenRefs />
  </Provider>,

  document.getElementById('root')
);
registerServiceWorker();
