import { useEffect, useState } from "react";
import MovieWrapper from "../Components/MovieWrapper";
import { fetchMovieById } from "../Api/api.js";

export default function FavoritesPage() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (!saved) {
      setLoading(false);
      return;
    }
    const ids = JSON.parse(saved);
    if (ids.length === 0) {
      setLoading(false);
      return;
    }

    Promise.all(ids.map((id) => fetchMovieById(id)))
      .then((movies) => setFavoriteMovies(movies))
      .catch(() => setError("Failed to retrieve favorite movies"))
      .finally(() => setLoading(false));
  }, []);

  const handleUnfavorite = (movieId) => {
    setFavoriteMovies((prev) => prev.filter((m) => m.id !== movieId));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (favoriteMovies.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Inga favoriter ännu.
      </p>
    );
  }

  return (
    <MovieWrapper movies={favoriteMovies} onUnfavorite={handleUnfavorite} />
  );
}
