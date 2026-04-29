//RandomMovie in Navbar
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

//Search in Navbar
export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok) throw new Error("The search failed to retrieve movies");

  const data = await response.json();
  //Updates the 12 videos to the ones the user has searched for
  return data.results.slice(0, 12);
}

//FavoritesPage + MoviePage
export async function fetchMovieById() {}

//RandomTrailer
export async function fetchPopularMovies() {}

//RandomTrailer
export async function fetchMovieTrailers() {}

//Filter
export async function fetchMoviesForFilter() {}

//Pagination
export async function fetchDiscoverMovies() {}
