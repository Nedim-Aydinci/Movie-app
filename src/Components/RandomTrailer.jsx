import React from "react";
import { useEffect, useState } from "react";
import "../Styles/RandomTrailer.css";
import { fetchMovieTrailers, fetchPopularMovies } from "../Api/api.js";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const RandomTrailer = () => {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPopularMovies()
      .then((results) => {
        //random selection
        //we generate array length amount integer by using "math.floor"
        const randomIndex = Math.floor(Math.random() * results.length);
        setMovie(results[randomIndex]);
      })
      .catch(() => setError("Something went wrong, failed to get movies"));
  }, []);

  useEffect(() => {
    //early return if no movie was found
    if (!movie) return;
    fetchMovieTrailers(movie.id)
      .then((results) => {
        const trailer = results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        );
        setTrailerKey(trailer?.key);
      })
      .catch(() => setError("Kunde inte hämta trailer."))
      .finally(() => setLoading(false));
  }, [movie]);

  //loading and error state messages
  if (loading) return <p>Loading trailer...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="trailer-section">
      <h2 className="trailer-title">{movie?.title}</h2>

      {trailerKey ? (
        <div className="trailer-container">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            allowFullScreen
          />
        </div>
      ) : (
        <p>Trailer not available</p>
      )}
    </div>
  );
};

export default RandomTrailer;
