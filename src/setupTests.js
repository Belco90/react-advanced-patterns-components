import '@testing-library/jest-dom/extend-expect';

// avoid pollution of warnings about react-bootstrap components using deprecated
// lifecycle methods
const originalWarn = console.warn;
beforeAll(() => {
  // Skip warnings about deprecated lifecycle methods on 3rd party packages
  console.warn = (...args) => {
    if (
      /Warning.*has been renamed, and is not recommended for use/.test(args[0])
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});
