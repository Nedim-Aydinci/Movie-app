import { useState } from "react";
import { FaDice } from "react-icons/fa";
import MovieInfoCard from "./MovieInfoCard";
import "../Styles/RandomMovie.css";
import { fetchRandomMovie } from "../Api/api.js";

export default function RandomMovie() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /*the function to get the random movie that we pass to the button, 
  so every time we press the button it runs the function
  */
  const handleFetchRandomMovie = async () => {
    //removes the existing random movie before the new one comes
    setMovie(null);
    setLoading(true);
    setError(null);

    try {
      const randomMovie = await fetchRandomMovie();
      setMovie(randomMovie);
    } catch {
      setError("Failed to retrieve random movie.");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="random-movie-container">
      <div className="random-movie-wrapper">
        {/*if there is no problem and we get a movie it will be displayed in MovieInfoCard*/}
        {movie && <MovieInfoCard movie={movie} />}
        {/*we pass the function to onClick so everytime we click it runs the function, and disable button if loading is true and if loading is true we see the text "Loading..."" otherwise we see "Click to get a random movie!"*/}
        <button
          className="random-btn"
          onClick={handleFetchRandomMovie}
          disabled={loading}
        >
          {loading ? "Loading..." : <FaDice />}
        </button>
      </div>
    </div>
  );
}
