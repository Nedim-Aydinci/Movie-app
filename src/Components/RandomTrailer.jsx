import React from "react";
import { useEffect, useState } from "react";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const RandomTrailer = () => {
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular", {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("movies:", data.results);

        // random selection
        //we generate array length amount integer by using "math.floor"
        const randomIndex = Math.floor(Math.random() * data.results.length);

        const randomMovie = data.results[randomIndex];

        setMovie(randomMovie);
      });
  }, []);
  return <div>{movie?.title}</div>;
};

export default RandomTrailer;
