import { watchlistArray } from "./watchlistArray.js";
const searchBarEl = document.getElementById("submit-form");
const searchInputEl = document.getElementById("search-input");
const filmsContainer = document.querySelector(".films-container");
searchBarEl.addEventListener("submit", handleFilmSearch);
filmsContainer.addEventListener("click", handleAddWatchlist);
function handleFilmSearch(e) {
  const searchResults = [];
  e.preventDefault();
  const searchInput = searchInputEl.value;
  fetch(`http://www.omdbapi.com/?apikey=2a222a3d&s=${searchInput}&type=movie`)
    .then((response) => response.json())
    .then((data) => {
      const searchResults = data.Search.map((film) => film.imdbID);
      filmsContainer.innerHTML = "";
      searchResults.forEach((result) => {
        fetch(`http://www.omdbapi.com/?apikey=2a222a3d&i=${result}&type=movie`)
          .then((response) => response.json())
          .then((d) => {
            let alreadyAdded = [];
            console.log(JSON.parse(localStorage.getItem("watchlistArr")));
            if (
              JSON.parse(localStorage.getItem("watchlistArr")) !== null &&
              JSON.parse(localStorage.getItem("watchlistArr")) !== undefined
            ) {
              let checkArray = JSON.parse(localStorage.getItem("watchlistArr"));
              alreadyAdded = checkArray.filter(
                (element) => element === d.imdbID
              );
            }
            let addWatchlist = `aq`;
            alreadyAdded.length === 0
              ? (addWatchlist = `<button class="add-btn" data-imdbId="${d.imdbID}"><i class="fa-solid fa-circle-plus" style="pointer-events: none;"></i> Watchlist </button>`)
              : (addWatchlist = `<h5>Already added to watchlist</h5>`);
            console.log(d);
            filmsContainer.innerHTML += `
           <div class="film-container">
           <div class="film-banner">
           <img src="${d.Poster} ">
          </div>
          <div class="film-info">
          <div class="film-title"> <h3>${d.Title}</h3> <p> <i class="fa-solid fa-star"></i>  ${d.imdbRating}</p></div>
          <div class="film-detail"> <p>${d.Runtime} </p> <p> ${d.Genre} </p> ${addWatchlist} </div>
          <div class="film-plot"> <p> ${d.Plot}</p>  </div>
          </div>
           </div>
            `;
          });
      });
    })
    .catch((error) => {
      filmsContainer.innerHTML =
        '<div class="placeholder"><h2>Unable to find what you’re looking for. Please try another search.</h2>  </div> ';
    });
}

function handleAddWatchlist(e) {
  if (e.target.classList.contains("add-btn")) {
    let duplicate = watchlistArray.filter(
      (film) => film === e.target.dataset.imdbid
    );
    if (duplicate.length > 0) {
      console.log("sorry");
    } else {
      watchlistArray.push(e.target.dataset.imdbid);
      localStorage.setItem("watchlistArr", JSON.stringify(watchlistArray));
      e.target.innerHTML = "<h5>Already added to watchlist</h5>";
    }
  }
}
