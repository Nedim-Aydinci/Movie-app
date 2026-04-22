import { useEffect, useState } from "react";
import { fetchAllMovies } from "../Api/Api_SortFilter.js";
import "../Styles/MovieFilter.css";
import "../Components/MovieCard.jsx";
import MovieCard from "../Components/MovieCard.jsx";

function MovieFilter() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [filterGenre, setFilterGenre] = useState("");

  //Get data via api
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

  //Filters the list before choosing sorting
  const sortedMovies = [...movies]
    .filter((movie) => {
      if (filterGenre === "") return true;
      return movie.genre_ids.includes(Number(filterGenre));
    })

    //Sort the result of the filtering
    .sort((a, b) => {
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
          <label htmlFor="genre-select">Sort By</label>
          <select
            id="genre-select"
            value={filterGenre}
            onChange={(event) => setFilterGenre(event.target.value)}
          >
            {/*value is linked to a genre in the TMDB API.  */}
            <option value="">All Genres</option>
            <option value="28">Action</option>
            <option value="12">Adventure</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
            <option value="27">Horror</option>
            <option value="10749">Romance</option>
            <option value="878">Science Fiction</option>
            <option value="53">Thriller</option>
          </select>

          <label htmlFor="filter-select">and</label>
          <select
            id="filter-select"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="">Show all movies</option>
            <option value="title">Title</option>
            <option value="releaseDate">Release Year</option>
            <option value="popularity">Rating</option>
          </select>
        </div>

        <div className="movie-wrapper">
          {sortedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MovieFilter;
