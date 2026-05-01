import { useEffect, useState, useRef } from "react";
import "../Styles/MovieFilter.css";
import MovieWrapper from "./MovieWrapper.jsx";
import { fetchMoviesForFilter, fetchSearchMovies } from "../Api/api.js";
import Pagination from "./Pagination.jsx";
import useSearchStore from "../store/searchStore.js";

function MovieFilter() {
  const [sortBy, setSortBy] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [defaultMovies, setDefaultMovies] = useState([]);
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
      setLoading(true);
      setError(null);
      fetchSearchMovies(query, currentPage)
        .then((data) => {
          setMovies(data.movies);
          setTotalPages(data.totalPages);
        })
        .catch(() => setError("Failed to retrieve movies"))
        .finally(() => setLoading(false));
    }, 500);

    //no timeout runs in the background after the component disappears
    return () => clearTimeout(searchTimeout.current);
  }, [mode, query, currentPage]);

  //"mode-browse" is activated when the user uses the sort & filter function
  useEffect(() => {
    if (mode !== "browse") return;
    setLoading(true);
    setError(null);
    fetchMoviesForFilter(currentPage, filterGenre)
      .then((data) => {
        setMovies(data.movies);
        setDefaultMovies(data.movies);
        setTotalPages(data.totalPages);
      })
      .catch(() => setError("Failed to retrieve movies"))
      .finally(() => setLoading(false));
  }, [currentPage, mode, filterGenre]);

  //Resets all filters and switches back to browse mode.
  //Called, when the user clicks "Clear search".
  const handleReset = () => {
    setMovies(defaultMovies);
    setMode("browse");
    setQuery("");
    setFilterGenre("");
    setSortBy("");
    setCurrentPage(1);
  };

  /*Genre filtering is handled by TMDB's API via the filterGenre parameter,
  the API returns already filtered movies, which means we don't need to filter 
  the list locally in the component*/
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === "title")
      return a.original_title.localeCompare(b.original_title);
    if (sortBy === "releaseDate")
      return new Date(a.release_date) - new Date(b.release_date);
    if (sortBy === "popularity") return b.popularity - a.popularity;
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
                setCurrentPage(1); //Reset to page 1 when new genre selection is made
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
              onChange={(e) => setSortBy(event.target.value)}
            >
              <option value="">Show all movies</option>
              <option value="title">Title</option>
              <option value="releaseDate">Release Year</option>
              <option value="popularity">Rating</option>
            </select>
          </>
        )}

        {/*In search mode search term and a reset button is displayed*/}
        {mode === "search" && (
          <p>
            Search results for "{query}" –{" "}
            <button onClick={handleReset}>Clear</button>
          </p>
        )}
      </div>

      {loading ? <p>Loading...</p> : <MovieWrapper movies={sortedMovies} />}

      {/* Pagination only appears in browse mode, not when searching */}
      {mode === "browse" && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default MovieFilter;
