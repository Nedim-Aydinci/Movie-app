async function fetchAllMovies() {
  const response = await fetch("https://jsonfakery.com/movies/infinite-scroll");
  if (!response.ok) {
    throw new Error("Failed to get movies.");
  }
  const data = await response.json();
  return data.data;
}

export { fetchAllMovies };
