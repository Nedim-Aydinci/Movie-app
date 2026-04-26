import MovieWrapper from "../Components/MovieWrapper";
import Pagination from "../Components/Pagination";

export default function Home({
  movies,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <>
      <MovieWrapper movies={movies} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
}
