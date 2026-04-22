const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchAllMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular`, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movies.");
  }
  const data = await response.json();
  return data.results;
}

export { fetchAllMovies };
