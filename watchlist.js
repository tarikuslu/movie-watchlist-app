import { watchlistArray } from "./watchlistArray.js";
const filmsContainer = document.querySelector(".films-container");
let watchArray = JSON.parse(localStorage.getItem("watchlistArr"));
console.log(typeof watchArray);

filmsContainer.addEventListener("click", handleRemoveWatchlist);

function handleRemoveWatchlist(e) {
  if (e.target.classList.contains("remove-btn")) {
    watchArray = watchArray.filter(
      (filmId) => filmId !== e.target.dataset.imdbid
    );
    localStorage.setItem("watchlistArr", JSON.stringify(watchArray));
  }
  render();
  console.log(watchArray);
}

function render() {
  if (watchArray.length == 0) {
    filmsContainer.innerHTML = ` <div class="placeholder">
          <h2>Your watchlist is looking a little empty</h2>
          <a class="add-movie" href="/index.html"><i class="fa-solid fa-circle-plus"></i> Lets add some movies</a>
      </div>`;
    return;
  }
  filmsContainer.innerHTML = "";
  watchArray.forEach((result) => {
    fetch(`http://www.omdbapi.com/?apikey=2a222a3d&i=${result}&type=movie`)
      .then((response) => response.json())
      .then((d) => {
        console.log(d);
        filmsContainer.innerHTML += `
           <div class="film-container">
           <div class="film-banner">
           <img src="${d.Poster} ">
          </div>
          <div class="film-info">
          <div class="film-title"> <h3>${d.Title}</h3> <p> <i class="fa-solid fa-star"></i>  ${d.imdbRating}</p></div>
          <div class="film-detail"> <p>${d.Runtime} </p> <p> ${d.Genre} </p> <button class="remove-btn" data-imdbId="${d.imdbID}"><i class="fa-solid fa-circle-minus" style="pointer-events: none;"></i> Watchlist </button> </div>
          <div class="film-plot"> <p> ${d.Plot}</p>  </div>
          </div>
           </div>
            `;
      });
  });
}

render();
