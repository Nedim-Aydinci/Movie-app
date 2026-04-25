import { useEffect, useState } from "react";
import "./App.css";
import MovieWrapper from "./Components/MovieWrapper";
import RandomTrailer from "./Components/RandomTrailer";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); //pagination, kan tas bort bara för test

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?with_original_language=en",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TMDB_TOKEN}`,
          accept: "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((responseObject) => {
        const fetchTwelve = responseObject.results.slice(0, 12);
        setMovies(fetchTwelve);
      })

      .catch((error) => console.error("Error fetching movies", error));
  }, [page]);

  return (
    <div className="page-container">
      <div className="top-section">
        <div className="genres">Genres</div>
        <div className="trailer-area">
          <RandomTrailer />
        </div>
      </div>

      <MovieWrapper movies={movies} />
    </div>
  );
}

export default App;
