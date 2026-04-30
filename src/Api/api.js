/*This file handles all fetches, headers and authentication 
for the project.
The API key is retrieved from the .env file and is 
never exposed in the code.
Version 3 of TMDB's API
*/
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${TMDB_TOKEN}`,
  accept: "application/json",
};

// ============================================================
export async function fetchRandomMovie() {
  //picks a random number and to get a page number
  const randomPage = Math.floor(Math.random() * 500) + 1;

  const response = await fetch(
    `${BASE_URL}/discover/movie?language=en-US&page=${randomPage}&sort_by=popularity.desc`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok) throw new Error("Could not fetch random movie");

  const data = await response.json();
  //getting a random number depending on how much data we get
  const randomIndex = Math.floor(Math.random() * data.results.length);
  //returns the movie that the random number was on
  return data.results[randomIndex];
}

// ============================================================
/*used by MovieFilter.jsx (via SearchContext)
Returns both the movie list and the total number of pages so that the 
Pagination-component can display the correct number
*/
export async function searchMovies(query, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    { method: "GET", headers },
  );
  if (!response.ok) throw new Error("Sökningen misslyckades");
  const data = await response.json();
  return {
    movies: data.results,
    totalPages: data.total_pages,
  };
}

// ============================================================
//FavoritesPage + MoviePage
export async function fetchMovieById() {}

// ============================================================
//RandomTrailer
export async function fetchPopularMovies() {}

// ============================================================
//RandomTrailer
export async function fetchMovieTrailers() {}

// ============================================================
//Filter
export async function fetchMoviesForFilter() {}

// ============================================================
//Pagination
export async function fetchDiscoverMovies() {}
