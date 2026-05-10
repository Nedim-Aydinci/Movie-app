import { useParams } from "react-router";
import { useState, useEffect } from "react";
import MovieInfoCard from "../Components/MovieInfoCard";
import NotFound from "./NotFoundPage";
import { fetchMovieById } from "../Api/api.js";

export default function MoviePage() {
  const { id } = useParams(); //Hämtar filmID från URL
  const [movie, setMovie] = useState(null); //Ingen film vald från början
  const [credits, setCredits] = useState(null); //Regissör och skådespelare
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieById(id)
      .then((data) => setMovie(data))
      .catch(() => setError("Failed to retrieve movie"))
      .finally(() => setLoading(false));
  }, [id]);

  if (!movie || !credits) return <p>Laddar...</p>; //Visa laddningstext medan API-svaret hämtas, movie är null tills dess
  if (movie?.success === false) return <NotFound />;

  return (
    <>
      <MovieInfoCard movie={movie} credits={credits} />
    </>
  );
}
