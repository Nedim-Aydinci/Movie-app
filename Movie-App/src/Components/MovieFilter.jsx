import { useEffect, useState } from "react";
import { fetchAllMovies } from "../Api/Api.js";
//Glöm inte att importea MovieCard-komponenten

function MovieFilter() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("");

  //Hämta data via api
  useEffect(() => {
    fetchAllMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch(() => {
        setError("Failed to load movies.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //Early return
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  //Sortera listan
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === "title") {
      return a.original_title.localeCompare(b.original_title);
    }
    if (sortBy === "releaseDate") {
      return new Date(a.release_date) - new Date(b.release_date);
    }
    if (sortBy === "popularity") {
      return b.popularity - a.popularity;
    }
    return 0;
  });

  return (
    <>
      <div className="movie-filter-container">
        <div className="movie-filter-controls">
          <label className="movie-filter-select">Sort By Filter</label>
          <select
            id="filter-select"
            value={filterBy}
            onChange={(event) => setFilterBy(event.target.value)}
          >
            <option value="">Show all movies</option>
            <option value="title">Title</option>
            <option value="releaseDate">Release Year</option>
            <option value="popularity">Rating</option>
          </select>
        </div>

        {/*Här ska MovieCard komponenten läggas till,
        exempel-kod:
        <div className="movie-filter-wrapper">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>*/}
      </div>
    </>
  );
}

export default MovieFilter;
