import { useState } from "react";
import { FaDice } from "react-icons/fa";
import MovieCard from "./MovieCard";
import MovieInfoCard from "./MovieInfoCard";
import "../Styles/RandomMovie.css";

//API key for fetch
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function RandomMovie() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  //the function to get the random movie that we pass to the button, so every time we press the button it runs the function
  const fetchRandomMovie = async () => {
    //removes the existing random movie before the new one comes
    setMovie(null);
    setLoading(true);

    try {
      //picks a random number and to get a page number
      const randomPage = Math.floor(Math.random() * 500) + 1;
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${randomPage}&sort_by=popularity.desc`,
        {
          method: "GET",
          headers: {
            //API key
            Authorization: `Bearer ${TMDB_TOKEN}`,
            accept: "application/json",
          },
        },
      );
      const data = await response.json();
      //getting a random number depending on how much data we get
      const randomIndex = Math.floor(Math.random() * data.results.length);
      //sets selectedMovie to the movie that the random number was on
      const selectedMovie = data.results[randomIndex];

      setMovie(selectedMovie);
    } catch (error) {
      console.error("Could not fetch random movie:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="random-movie-container">
      <div className="random-movie-wrapper">
        {/*if there is no problem and we get a movie it will be displayed in MovieInfoCard*/}
        {movie && <MovieInfoCard movie={movie} />}
        {/*we pass the function to onClick so everytime we click it runs the function, and disable button if loading is true and if loading is true we see the text "Loading..."" otherwise we see "Click to get a random movie!"*/}
        <button
          className="random-btn"
          onClick={fetchRandomMovie}
          disabled={loading}
        >
          {loading ? "Loading..." : <FaDice />}
        </button>
      </div>
    </div>
  );
}
