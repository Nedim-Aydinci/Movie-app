import { useParams } from "react-router";
import { useState, useEffect } from "react";
import MovieInfoCard from "../Components/MovieInfoCard";
import { useMovieFetch } from "../Stores/useMovieFetch";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function MoviePage() {
  const { id } = useParams(); //Hämtar filmID från URL
  const { selectedMovie, movieById, isLoading} = useMovieFetch()
  
  useEffect(() => {
    movieById(id);
  }, [id, movieById])

  if (!selectedMovie|| isLoading) return <p>Laddar...</p>; //Visa laddningstext medan API-svaret hämtas, movie är null tills dess

  return (
    <>
      <MovieInfoCard movie={selectedMovie} credits={selectedMovie.credits} />
    </>
  );
}
