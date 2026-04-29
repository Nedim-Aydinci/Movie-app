import { useEffect, useState } from "react";
import MovieWrapper from "../Components/MovieWrapper";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function FavoritesPage() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (!saved) return;
    const ids = JSON.parse(saved);
    if (ids.length === 0) return;

    Promise.all(
      ids.map((id) =>
        fetch(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            accept: "application/json",
          },
        }).then((res) => res.json()),
      ),
    ).then((movies) => setFavoriteMovies(movies));
  }, []);

  const handleUnfavorite = (movieId) => {
    setFavoriteMovies((prev) => prev.filter((m) => m.id !== movieId));
  };

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
