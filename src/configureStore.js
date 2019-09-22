import { configureStore as reduxStarterKitConfigureStore } from 'redux-starter-kit';
import reducer from './ducks';

function configureStore(initialState = {}) {
  return reduxStarterKitConfigureStore({
    reducer,
    preloadedState: initialState,
  });
}

export default configureStore;
