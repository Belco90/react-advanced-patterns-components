import { createAction, handleActions } from 'redux-actions';

// -TYPES
const CONTENT_FILTER_SET = 'content-filter/SET';

// -ACTIONS
export const setContentFilter = createAction(CONTENT_FILTER_SET);

// -STATE
const initialState = '';

// -REDUCERS
export default handleActions({
  [CONTENT_FILTER_SET]: (state, { payload }) => payload,
}, initialState);
