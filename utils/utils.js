// when the user keeps typing in the input it keeps resetting the set timeout thus
// not allowing the fetch function to be called until the user quite typing
// debouncing an input

const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
