const apiKey = "14d45e878e9d32920dfb8f43a504254b";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";

const apiPaths = {
  movieGenre: `${apiEndpoint}/genre/movie/list?api_key=${apiKey}`,
  fetchMovie: (id) =>
    `${apiEndpoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,

    fetchTrending: `${apiEndpoint}/trending/all/day?api_key=${apiKey}`
};

// Boots up the app.
function init() {
  fetchMovieCategory();
  fetchTrendingMovies();
}

// Frtching Trending Movies
function fetchTrendingMovies(){
    fetchMovieCategoryList(apiPaths.fetchTrending, "Trending Now")
    .then(list => {
      const randomIndex = parseInt(Math.random() * list.length)
      buildBannerSection(list[randomIndex])
    })

}


// Building Banner Section
function buildBannerSection(movie){
    
  const bannerCont = document.getElementById('banner-cont')
  bannerCont.style.backgroundImage = `url(${imgPath}${movie.backdrop_path})`

    
  const div = document.createElement('div')
    div.innerHTML = `
    <div class="banner-content container">
            <div class="movie-info">
            <h2 class="banner-title">${movie.title}</h2>
            <p class="banner-info">${movie.overview.length > 200 ? movie.overview.slice(0,200).trim()+ '...' : movie.overview}</p>
            <p class="banner-rating">Rating: ${Math.ceil(movie.vote_average)}</p>
        </div>
            <div class="button-cont">
                <button class="btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard" data-name="Play"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>Play</button>
                <button class="btn btn-sec"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard" data-name="Info"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg>More Info</button>
            </div>`

            div.className = "banner-content"

            bannerCont.append(div);
}


// Fetching Movies Categorically
function fetchMovieCategory() {
  fetch(apiPaths.movieGenre)
    .then((res) => res.json())
    .then((res) => {
      const categories = res.genres;
      console.log(categories);
      if (Array.isArray(categories) && categories.length > 0) {
        categories.forEach((category) => {
          fetchMovieCategoryList(
            apiPaths.fetchMovie(category.id),
            category.name
          );
        });
      }
    })
    .catch((err) => console.error(err));
}

// This is giving Array of Movies.
function fetchMovieCategoryList(fetchUrl, categoryName) {
  return fetch(fetchUrl)
    .then((res) => res.json())
    .then((res) => {
      const movies = res.results;
      console.log(res.results);
      if (Array.isArray(movies) && movies.length > 0) {
        buildMovieSection(movies, categoryName);
      }
      return movies
    })
    .catch((err) => console.error(err));
}

// Building Movie Section with array of movies
function buildMovieSection(movie, categoryName) {
  // console.log(movie, categoryName)
  const movieContainer = document.getElementById("movies-cont");
  const movieListHTML = movie.map((item) => {
    return `
        <div class="movie-title-cont">
        <img class="movie-img" src="${imgPath}${item.backdrop_path}" alt="${item.title}">
        <p class="movie-title" >${item.title}</p>
        </div>
        `;
  });
  const movieContHTML = `
    <h2 class="content-heading">${categoryName}<span class="explore-nudge">Explore All</span></h2>
    <div class="movies-row">
    ${movieListHTML}
    </div>
    `;
  const div = document.createElement("div");
  div.className = "movies-section";
  div.innerHTML = movieContHTML;

  // Appending div into MovieConatiner(Main container).
  movieContainer.append(div);
}

window.addEventListener("load", function () {
  init();

  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (scrollY > 5) {
      header.classList.add("bg-black");
    } else {
      header.classList.remove("bg-black");
    }
  });
});


