import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';

const ProviderWrapper = storyFn => (
  <Provider store={configureStore()}>{storyFn()}</Provider>
);
addDecorator(ProviderWrapper);

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
