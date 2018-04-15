import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './ducks';

const middlewares = [];

function configureStore(initialState = {}) {
  const isProd = process.env.NODE_ENV === 'production';

  const composeEnhancers =
    (!isProd && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}

export default configureStore;
