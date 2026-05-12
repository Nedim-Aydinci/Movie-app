import { useEffect, useState, useRef } from "react";
import "../Styles/MovieFilter.css";
import MovieWrapper from "./MovieWrapper.jsx";
import Pagination from "./Pagination.jsx";
import useSearchStore from "../Stores/useSearchStore.js";
import { useMovieFetch } from "../Stores/useMovieFetch.js";

function MovieFilter() {
  const [sortBy, setSortBy] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const { movies, isLoading, error, totalPages, currentPage, setCurrentPage, searchMovies, filterMovies } = useMovieFetch()
  const { query, setQuery, mode, setMode } = useSearchStore(); //Retrieves state and setters directly from the state store

  //delay when the user searches for movies
  //useRef from React saves a value between renders without triggering a new render
  const searchTimeout = useRef(null);

  useEffect(() => {
    //"mode-search" is activated when the user uses the search function
    if (mode !== "search" || query.trim() === "") return;

    //clears previous timeout when user types again
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      setFilterGenre("");
      setSortBy("");
      searchMovies(query, currentPage)
    }, 500);

    //no timeout runs in the background after the component disappears
    return () => clearTimeout(searchTimeout.current);
  }, [mode, query, currentPage, searchMovies]);

  //"mode-browse" is activated when the user uses the sort & filter function
  useEffect(() => {
    if (mode !== "browse") return;
    filterMovies(currentPage, filterGenre)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage, mode, filterGenre, filterMovies]);

  //Resets all filters and switches back to browse mode.
  //Called, when the user clicks "Clear search".
  const handleReset = () => {
    setMode("browse");
    setQuery("");
    setFilterGenre("");
    setSortBy("");
  };

  console.log("Filmer skickas till Wrapper:", movies);

  /*Genre filtering is handled by TMDB's API via the filterGenre parameter,
  the API returns already filtered movies, which means we don't need to filter 
  the list locally in the component*/
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === "title")
      return a.original_title.localeCompare(b.original_title);
    if (sortBy === "releaseDate")
      return new Date(a.release_date) - new Date(b.release_date);
    if (sortBy === "popularity") return b.vote_average - a.vote_average;
    
    return 0;
  });

  if (error) return <p>{error}</p>;

  return (
    <div className="movie-filter-container">
      <div className="movie-filter-controls">
        {/* Filter controls only appear in browse mode */}
        {mode === "browse" && (
          <>
            <label htmlFor="genre-select">Sort By</label>
            <select
              id="genre-select"
              value={filterGenre}
              onChange={(e) => {
                setFilterGenre(e.target.value);
                setCurrentPage(1)
              }}
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
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Show All Movies</option>
              <option value="title">Title</option>
              <option value="releaseDate">Release Year</option>
              <option value="popularity">Rating</option>
            </select>
          </>
        )}

        {/*In search mode search term and a reset button is displayed*/}
        {mode === "search" && (
          <p id="clear-text">
            Search results for "{query}" –{" "}
            <button id="clear-btn" onClick={handleReset}>Clear</button>
          </p>
        )}
      </div>

      <MovieWrapper movies={sortedMovies} />
      {isLoading && <div className="spinner">Laddar nya filmer...</div>}

      {/* Pagination only appears in browse mode, not when searching */}
      {mode === "browse" && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default MovieFilter;
