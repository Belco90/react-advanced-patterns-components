// -TYPES
const FILTERS_CLEAR_ALL = 'filters/CLEAR_ALL';
const FILTERS_CONTENT_SET = 'filters/content/SET';

// -ACTIONS
export const clearAllFilters = () => ({
  type: FILTERS_CLEAR_ALL,
});

export const setFiltersContent = value => ({
  type: FILTERS_CONTENT_SET,
  payload: value,
});

// -STATE
const initialState = {
  content: '',
};

// -REDUCERS

export default function filtersReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FILTERS_CLEAR_ALL:
      return initialState;

    case FILTERS_CONTENT_SET:
      return { ...state, content: payload };

    default:
      return state;
  }
}
