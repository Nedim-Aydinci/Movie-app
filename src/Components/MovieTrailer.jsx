import { useEffect } from "react";
import { useMovieFetch } from "../Stores/useMovieFetch";
import "../Styles/MovieTrailer.css";

export default function MovieTrailer({ movieId }) {
  const { selectedTrailer, movieTrailers } = useMovieFetch();

  //Fetch trailer when movieId changes
  useEffect(() => {
    if (movieId && selectedTrailer?.id !== movieId) {
      movieTrailers(movieId);
    }
  }, [movieId]); //change trailer when movieId changes

  return (
    <div className="movie-trailer">
      {/*if trailer is available show it*/}
      {selectedTrailer?.trailerKey ? (
        <div className="movie-trailer-container">
          <iframe
            src={`https://www.youtube.com/embed/${selectedTrailer.trailerKey}`}
            title="Trailer"
            allowFullScreen
          />
        </div>
      ) : (
        <p>Trailer not available</p>
      )}
    </div>
  );
}
