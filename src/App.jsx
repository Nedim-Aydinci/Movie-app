import "./App.css";
import React from "react";
import Pagination from "./Components/Pagination";

const App = () => {
  const [movies, setMovies] = useState([]);
  //state lift up due to use state variables in app
  const [currentPage, setCurrentpage] = useState(1);

  useEffect(() => {
    fetch("https://jsonfakery.com/movies/infinite-scroll")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []); //empty array to prevent default rendering
  return (
    <>
      <div>App</div>
      <Pagination currentPage={currentPage} setCurrentpage={setCurrentpage} />
    </>
  );
};

export default App;
