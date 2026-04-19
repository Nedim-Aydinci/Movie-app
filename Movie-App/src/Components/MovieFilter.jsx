import { useEffect, useState } from "react";
import { fetchAllMovies } from "../Api/FilterApi.js";

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
  if(loading) return <p>Loading...</p>;
  if(error) return <p>{error}</p>;

  
  return (
    <>
    <div className="movie-filter-container">
      <div className="movie-filter-controls">
      <label className="movie-filter-controls">
        Sort By Filter
        </label>
      <select className="movie-filter-controls" value={} onChange={}>
        <option value="">- none -</option>
        <option value="title">Title</option>
        <option value="releaseDate">Release Year</option>
        <option value="popularity">Rating</option>
      </select>
      </div>

    </div>
    </>
  );
}

export default MovieFilter;