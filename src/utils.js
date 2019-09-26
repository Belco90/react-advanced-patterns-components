import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';
import { render } from '@testing-library/react';

export const capitalize = ([first, ...rest] = []) =>
  first ? first.toUpperCase() + rest.join('') : '';

export const renderWithRedux = (
  ui,
  { initialState, store = configureStore(initialState) } = {}
) => ({
  ...render(<Provider store={store}>{ui}</Provider>),
  store,
});
