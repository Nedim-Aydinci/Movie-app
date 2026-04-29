import "./App.css";
import MovieFilter from "./Components/MovieFilter";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import RandomMoviePage from "./pages/RandomMoviePage";
import MoviePage from "./pages/MoviePage";
import Layout from "./Components/Layout";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const App = () => {
  const [movies, setMovies] = useState([]);
  //state lift up due to use state variables in app
  const [defaultMovies, setDefaultMovies] = useState([]); 
  //Sparar orginalfilmerna som laddas in i en array när användaren kommer in på sidan
  const [currentPage, setCurrentPage] = useState(1);
  //totalPages implemented after changing api-source
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?with_original_language=en&page=${currentPage}&sort_by=popularity.desc`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TMDB_TOKEN}`,
          accept: "application/json",
        },
      },
    )           
      .then((res) => res.json())
      .then((data) => {
        const fetchTwelve = data.results.slice(0, 12);
        //to display less movieCard "slice" implemented to results
        setMovies(fetchTwelve); // <-- change with respect to page layout
        setTotalPages(data.total_pages);
        setDefaultMovies(fetchTwelve);
      })
      .catch((error) => console.error("Error fetching movies", error));
  }, [currentPage]); //page based render


  const onReset = () => { 
    setMovies(defaultMovies);    //Återställer movies till originalfilmerna när användaren klickar på loggan
  }


  const onSearch = (query) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, 
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: "application/json",
      },
    },
    ) 
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results.slice(0, 12)); //Uppdaterar de 12 filmera till de användaren har sökt på
    })
    .catch((error) => console.error("Error fetching movies", error));
  };

  return (
    <Routes>
      <Route path="/" element={<Layout onReset={onReset}/>}>
        <Route
          index
          element={
            <HomePage
              movies={movies}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              onSearch={onSearch}
            />
          }
        />
        <Route path="randommovie" element={<RandomMoviePage />} />
        <Route path="movie/:id" element={<MoviePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
};

export default App;
