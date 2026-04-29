import Pagination from "../Components/Pagination";
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
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
}
