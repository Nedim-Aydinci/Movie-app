import { useParams } from "react-router";
import { useEffect } from "react";
import MovieInfoCard from "../Components/MovieInfoCard";
import { useMovieFetch } from "../Stores/useMovieFetch";
import NotFound from "./NotFoundPage";
import MovieTrailer from "../Components/MovieTrailer";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function MoviePage() {
  const { id } = useParams(); //Get id from url
  const { selectedMovie, movieById, isLoading } = useMovieFetch();

  //Fetch movie when id changes and when movieById changes
  useEffect(() => {
    movieById(id);
  }, [id, movieById]);

  if (!selectedMovie || isLoading) return <p>Laddar...</p>;
  if (selectedMovie?.success === false) return <NotFound />; //show not found page if movie is not found

  return (
    <>
      <MovieInfoCard movie={selectedMovie} credits={selectedMovie.credits} />
      <MovieTrailer movieId={id} />
    </>
  );
}
