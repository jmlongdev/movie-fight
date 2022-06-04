"use strict";

const API_KEY = "91b620f7";

//helper function
const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: API_KEY,
      s: searchTerm,
      //   i: "tt0848228",
    },
  });
  //   console.log(response.data);
  const {
    Title: title,
    Metascore: metascore,
    BoxOffice: boxOffice,
  } = response.data;
  //   console.log(title, metascore, boxOffice);
};

const input = document.querySelector("input");

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

const onInput = debounce((event) => {
  fetchData(event.target.value);
}, 500);

input.addEventListener("input", onInput);
