import "./App.css";
import { useState, useEffect } from "react";
import Pagination from "./Components/Pagination";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  //state lift up due to use state variables in app
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${currentPage}`,
    )
      .then((res) => res.json())
      .then((data) => {
        //to display less movieCard "slice" implemented to results
        setMovies(data.results.slice(0, 12)); // <-- change with respect to sourse
        setTotalPages(data.total_pages);
      });
  }, [currentPage]); //page based render

  //arranging the page display by moviecard per page
  //const moviesPerPage = 12;

  // const lastMovieIndex = currentPage * moviesPerPage;
  // const firstMovieIndex = lastMovieIndex - moviesPerPage;

  // const currentMovies = movies.slice(firstMovieIndex, lastMovieIndex);

  return (
    <>
      {/* <div>App</div> */}

      {/* movie list */}
      {movies.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default App;
