import "@testing-library/jest-dom";

beforeAll(() => {
  const observe = jest.fn();
  const unobserve = jest.fn();
  const disconnect = jest.fn();

  // you can also pass the mock implementation
  // to jest.fn as an argument
  // @ts-ignore
  window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve,
    disconnect,
  }));
});

export {};
