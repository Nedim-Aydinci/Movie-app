import { useEffect, useState } from "react";
import "../Styles/MovieFilter.css";
import MovieWrapper from "./MovieWrapper.jsx";

function MovieFilter({ movies }) {
  const [sortBy, setSortBy] = useState("");
  const [filterGenre, setFilterGenre] = useState("");

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
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentary</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="14">Fantasy</option>
            <option value="36">History</option>
            <option value="27">Horror</option>
            <option value="10402">Music</option>
            <option value="9648">Mystery</option>
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
        <MovieWrapper movies={sortedMovies} />
      </div>
    </>
  );
}

export default MovieFilter;
