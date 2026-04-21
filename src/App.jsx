import "./App.css";
import { useState, useEffect } from "react";
import Pagination from "./Components/Pagination";

const App = () => {
  const [movies, setMovies] = useState([]);
  //state lift up due to use state variables in app
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://jsonfakery.com/movies/paginated")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.data); // <-- önemli
      });
  }, []); //empty array to prevent default rendering

  //arranging the page display by moviecard per page
  const moviesPerPage = 12;

  const lastMovieIndex = currentPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;

  const currentMovies = movies.slice(firstMovieIndex, lastMovieIndex);

  return (
    <>
      <div>App</div>

      {/* movie list */}
      {currentMovies.map((movie) => (
        <p key={movie.id}>{movie.original_title}</p>
      ))}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalMovies={movies.length}
        moviesPerPage={moviesPerPage}
      />
    </>
  );
};

export default App;
