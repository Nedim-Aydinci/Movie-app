import { useState } from "react";
import MovieCard from "./MovieCard";
import MovieInfoCard from "./MovieInfoCard";
import "../Styles/RandomMovie.css"

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;


export default function RandomMovie() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomMovie = async () => {
    setMovie(null)
    setLoading(true);

    try {
      const randomPage = Math.floor(Math.random() * 500) + 1;
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${randomPage}&sort_by=popularity.desc`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            accept: "application/json",
          },
        },
      );
      const data = await response.json()
      const randomIndex = Math.floor(Math.random() * data.results.length)
      const selectedMovie = data.results[randomIndex]
      setMovie(selectedMovie)
    } catch (error) {
      console.error("Could not fetch random movie:", error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="random-movie-container">
      <div className="random-movie-wrapper">
        {movie && <MovieInfoCard movie={movie} />}
        <button className="random-btn" onClick={fetchRandomMovie} disabled={loading}>{loading ? "Laddar..." : "Click to get a random movie!"}</button>
      </div>
    </div>
  );
}
