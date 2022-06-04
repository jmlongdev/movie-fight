const createAutoComplete = ({ root }) => {
  root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input"/>
    <div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
    </div>`;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const movies = await fetchData(event.target.value);
    if (!movies.length) {
      dropdown.classList.remove("is-active");
      return;
    }
    resultWrapper.innerHTML = "";
    dropdown.classList.add("is-active");
    movies.map((movie) => {
      const option = document.createElement("a");
      option.classList.add("dropdown-item");
      option.innerHTML = `
    <img src="${movie.Poster === "N/A" ? "" : movie.Poster}"/>
    ${movie.Title}
    `;
      //this is a closure function and has access to anything in the movie object
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = movie.Title;
        onMovieSelect(movie);
      });
      resultWrapper.appendChild(option);
    });
  };

  input.addEventListener("input", debounce(onInput, 500));
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) dropdown.classList.remove("is-active");
  });
};
