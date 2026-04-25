import React from "react";
import { useEffect, useState } from "react";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const RandomTrailer = () => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    //early return if no movie was found
    if (!movie) return;

    fetch("https://api.themoviedb.org/3/movie/popular", {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
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
      });
  }, []);

  useEffect(() => {
    //early return if no movie was found
    if (!movie) return;

    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("videos:", data.results);

        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        );

        setTrailerKey(trailer?.key);
      });
  }, [movie]);
  return <div>{movie?.title}</div>;
};

export default RandomTrailer;
