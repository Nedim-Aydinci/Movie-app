import { useEffect, useState } from "react";
import "./App.css";
import MovieWrapper from "./Components/MovieWrapper";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); //pagination, kan tas bort bara för test
  const [defaultMovies, setDefaultMovies] = useState([]); //Sparar orginalfilmerna som laddas in i en array när användaren kommer in på sidan

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?with_original_language=en",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TMDB_TOKEN}`,
          accept: "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((responseObject) => {
        const fetchTwelve = responseObject.results.slice(0, 12);
        setMovies(fetchTwelve);           
        setDefaultMovies(fetchTwelve);    //Använder API-anropet för att återställa sidan, dvs gå tillbaka till de "gamla filmera" om användaren har sökt på ngt
      })

      .catch((error) => console.error("Error fetching movies", error));
  }, [page]);


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
      .then((responseObject) => {
        const fetchTwelve = responseObject.results.slice(0, 12);
        setMovies(fetchTwelve); //Uppdaterar de 12 filmera till de användaren har sökt på
    })
    
    .catch((error) => console.error("Error fetching movies", error));
  };

  return (
    <>
      <Navbar onSearch={onSearch} onReset={onReset}/>
      <MovieWrapper movies={movies} />
      
      <Footer />
    </>
  );
}

export default App;
