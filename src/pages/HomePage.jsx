import RandomTrailer from "../Components/RandomTrailer";
import MovieFilter from "../Components/MovieFilter";

export default function HomePage({
  movies,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <>
      <RandomTrailer key={currentPage} />
      <MovieFilter movies={movies} />
    </>
  );
}
