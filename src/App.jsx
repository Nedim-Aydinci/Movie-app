import "./App.css";
import React from "react";
import Pagination from "./Components/Pagination";

const App = () => {
  const [movies, setMovies] = useState([]);
  //state lift up due to use state variables in app
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://jsonfakery.com/movies/infinite-scroll")
      .then((res) => res.json())
      .then((data) => setMovies(data));
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
      <Pagination currentPage={currentPage} setCurrentpage={setCurrentpage} />
    </>
  );
};

export default App;
