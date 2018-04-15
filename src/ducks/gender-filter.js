import { createAction, handleActions } from 'redux-actions';

// -TYPES
const GENDER_FILTER_SET = 'gender-filter/SET';

// -ACTIONS
export const setGenderFilter = createAction(GENDER_FILTER_SET);

// -STATE
const initialState = '';

// -REDUCERS
export default handleActions({
  [GENDER_FILTER_SET]: (state, { payload }) => payload,
}, initialState);
