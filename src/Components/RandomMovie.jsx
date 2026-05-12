import { useEffect } from "react";
import { FaDice } from "react-icons/fa";
import MovieInfoCard from "./MovieInfoCard";
import "../Styles/RandomMovie.css";
import { useMovieFetch } from "../Stores/useMovieFetch";

export default function RandomMovie() {
  const { randomMovie, randomMovies, isLoading, error} = useMovieFetch()
  

  useEffect(() => {
    randomMovies()
  }, [randomMovies])

  if (error) return <p>{error}</p>;

  return (
    <div className="random-movie-container">
      <div className="random-movie-wrapper">
        {/*if there is no problem and we get a movie it will be displayed in MovieInfoCard*/}
        {randomMovie && <MovieInfoCard movie={randomMovie} credits={randomMovie.credits}/>}
        {/*we pass the function to onClick so everytime we click it runs the function, and disable button if loading is true and if loading is true we see the text "Loading..."" otherwise we see "Click to get a random movie!"*/}
        <button
          className="random-btn"
          onClick={randomMovies}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : <FaDice />}
        </button>
      </div>
    </div>
  );
}
