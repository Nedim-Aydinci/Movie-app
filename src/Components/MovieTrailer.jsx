import { useEffect } from "react";
import { useMovieFetch } from "../Stores/useMovieFetch";
import "../Styles/MovieTrailer.css";


export default function MovieTrailer({movieId}) {
    const { selectedTrailer, movieTrailers } = useMovieFetch();

    useEffect(() => {

      if (movieId && selectedTrailer?.id !== movieId) {
        movieTrailers(movieId);
      }

      }, [movieId]);
    
    return (
        <div className="movie-trailer">
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
    )
} 