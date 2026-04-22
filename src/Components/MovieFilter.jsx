import { useEffect, useState } from "react";
import { fetchAllMovies } from "../Api/Api_SortFilter.js";
import "../Styles/MovieFilter.css";

//Glöm inte att importea MovieCard-komponenten

function MovieFilter() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [filterGenre, setFilterGenre] = useState("");

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

  //Filtrerar listan innan val av sortering
  const sortedMovies = [...movies]
    .filter((movie) => {
      if (filterGenre === "") return true;
      return movie.genre_ids.includes(Number(filterGenre));
    })

    //Sortera resultatet av filtreringen
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
          <label htmlFor="filter-select">Sort By Filter</label>
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

          <label htmlFor="genre-select">Choose Your Genre</label>
          <select
            id="genre-select"
            value={filterGenre}
            onChange={(event) => setFilterGenre(event.target.value)}
          >
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
