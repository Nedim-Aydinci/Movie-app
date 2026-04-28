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
      <div className="page-container">
        <div className="top-section">
          <div className="page-wrapper">
            <RandomTrailer key={currentPage} />
          </div>
        </div>
      </div>
      <MovieFilter movies={movies} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
}
