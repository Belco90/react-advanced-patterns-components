import { createSlice } from 'redux-starter-kit';

export const initialState = {
  content: '',
  stars: false,
  location: '',
  age: ['', ''],
};

const filtersSlice = createSlice({
  slice: 'filters',
  initialState,
  reducers: {
    clearAllFilters: state => {
      Object.assign(state, initialState);
    },
    setFilters: (state, { payload }) => {
      Object.assign(state, payload);
    },
    setFiltersContent: (state, { payload }) => {
      state.content = payload;
    },
    setFiltersStars: (state, { payload }) => {
      state.stars = payload;
    },
    setFiltersLocation: (state, { payload }) => {
      state.location = payload;
    },
    setFiltersAge: (state, { payload }) => {
      state.age = payload;
    },
  },
});

export const {
  clearAllFilters,
  setFilters,
  setFiltersContent,
  setFiltersStars,
  setFiltersLocation,
  setFiltersAge,
} = filtersSlice.actions;

export default filtersSlice.reducer;
