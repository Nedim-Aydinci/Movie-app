import React from "react";
import { useEffect } from "react";
import "../Styles/RandomTrailer.css";
import { useMovieFetch } from "../Stores/useMovieFetch.js";

const RandomTrailer = () => {
  const { currentPage, selectedTrailer, randomTrailer, isLoading, error } =
    useMovieFetch();

  //everytime the currentPage changes, it will run the randomTrailer function
  useEffect(() => {
    randomTrailer();
  }, [currentPage]);

  //loading and error state messages
  if (isLoading) return <p>Loading trailer...</p>;
  if (!selectedTrailer) return null;
  if (error) return <p>{error}</p>;

  return (
    <div className="trailer-section">
      <h2 className="trailer-title">{selectedTrailer?.title}</h2>

      {selectedTrailer?.trailerKey ? (
        <div className="trailer-container">
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
};

export default RandomTrailer;
