export const capitalize = ([first, ...rest] = []) =>
  first ? first.toUpperCase() + rest.join('') : '';
