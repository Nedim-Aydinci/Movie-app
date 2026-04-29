import MovieCard from "./MovieCard";
import "../Styles/MovieWrapper.css";

export default function MovieWrapper({ movies, onUnfavorite }) {
  return (
    <section className="movie-wrapper">
      {/*maps through all movies from id and create a movie card for each one */}
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onUnfavorite={onUnfavorite} /> //la till onUnfavorite={onUnfavorite}
      ))}
    </section>
  );
}
