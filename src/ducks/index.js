import { combineReducers } from 'redux';
import contentFilter from './content-filter';
import genderFilter from './gender-filter';

export default combineReducers({
  contentFilter,
  genderFilter,
});
