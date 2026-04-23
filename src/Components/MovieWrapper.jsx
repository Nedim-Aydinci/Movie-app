import MovieCard from "./MovieCard";
import "../Styles/MovieWrapper.css";

export default function MovieWrapper({ movies }) {
  return (
    <section className="movie-wrapper">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}
