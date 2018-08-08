// -TYPES
const FILTERS_CLEAR_ALL = 'filters/CLEAR_ALL';
const FILTERS_CONTENT_SET = 'filters/content/SET';
const FILTERS_STARS_SET = 'filters/stars/SET';
const FILTERS_LOCATION_SET = 'filters/location/SET';
const FILTERS_AGE_SET = 'filters/age/SET';

// -ACTIONS
export const clearAllFilters = () => ({
  type: FILTERS_CLEAR_ALL,
});

export const setFiltersContent = value => ({
  type: FILTERS_CONTENT_SET,
  payload: value,
});

export const setFiltersStars = value => ({
  type: FILTERS_STARS_SET,
  payload: value,
});

export const setFiltersLocation = value => ({
  type: FILTERS_LOCATION_SET,
  payload: value,
});

export const setFiltersAge = value => ({
  type: FILTERS_AGE_SET,
  payload: value,
});

// -STATE
const initialState = {
  content: '',
  stars: false,
  location: '',
  age: ['', ''],
};

// -REDUCERS

export default function filtersReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FILTERS_CLEAR_ALL:
      return initialState;

    case FILTERS_CONTENT_SET:
      return { ...state, content: payload };

    case FILTERS_STARS_SET:
      return { ...state, stars: payload };

    case FILTERS_LOCATION_SET:
      return { ...state, location: payload };

    case FILTERS_AGE_SET:
      return { ...state, age: payload };

    default:
      return state;
  }
}
