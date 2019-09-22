import React from 'react';
import App from 'components/App';
import configureStore from 'configureStore';
import { Provider } from 'react-redux';

import 'index.css';

export default { title: 'App' };
export const defaultApp = () => <App />;
