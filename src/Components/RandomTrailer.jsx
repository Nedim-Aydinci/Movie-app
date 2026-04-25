import React from "react";
import { useEffect, useState } from "react";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const RandomTrailer = () => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("https://api.themoviedb.org/3/movie/popular", {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //debugging to see if it contains id or title
        //will be removed or commented out before the final push
        console.log("movies:", data.results);

        // random selection
        //we generate array length amount integer by using "math.floor"
        const randomIndex = Math.floor(Math.random() * data.results.length);

        const randomMovie = data.results[randomIndex];

        setMovie(randomMovie);
      })
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    //early return if no movie was found
    if (!movie) return;

    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("videos:", data.results);

        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        );

        setTrailerKey(trailer?.key);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [movie]);
  //loading state message
  if (loading) return <p> Loading trailer...</p>;

  //Error state message
  if (error) return <p>Something went wrong!</p>;

  return (
    <div>
      {movie?.title}

      {trailerKey ? (
        <inframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Trailer"
        />
      ) : (
        <p>Trailer not available</p>
      )}
    </div>
  );
};

export default RandomTrailer;
