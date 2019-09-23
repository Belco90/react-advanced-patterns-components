import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';

const Wrapper = storyFn => (
  <div style={{ padding: '40px' }}>
    <Provider store={configureStore()}>{storyFn()}</Provider>
  </div>
);
addDecorator(Wrapper);

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
