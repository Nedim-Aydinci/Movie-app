import { useEffect } from "react";
import MovieWrapper from "../Components/MovieWrapper";
import { useMovieFetch } from "../Stores/useMovieFetch.js";

export default function FavoritesPage() {
  const { favoriteMovies, fetchFavorites, isLoading, error } = useMovieFetch();

  //everytime the component mounts, it will run the fetchFavorites function
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (favoriteMovies.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem", color: "white" }}>
        Inga favoriter ännu.
      </p>
    );
  }

  return <MovieWrapper movies={favoriteMovies} />;
}
