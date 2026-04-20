import "../Styles/MovieCard.css";
import star from "../assets/star.svg";
import heart from "../assets/heart-red.svg";
import heartFilled from "../assets/heart-red-filled.svg";
import { useState } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, onClick = undefined }) {
  const [isFavorite, setIsFavorite] = useState(() => {
    const saved = localStorage.getItem("favorites");

    if (!saved) return false;

    const favorites = JSON.parse(saved);

    return favorites.includes(movie.id);
  });

  const posterPath = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const toggleFavorite = (e) => {
    e.stopPropagation();

    const saved = localStorage.getItem("favorites");
    let favorites = saved ? JSON.parse(saved) : [];

    if (isFavorite) {
      favorites = favorites.filter((id) => id !== movie.id);
    } else {
      favorites.push(movie.id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    setIsFavorite(!isFavorite);
  };

  return (
    <article
      className="movie-card"
      onClick={onClick}
      role={onClick ? "button" : "article"}
    >
      <div className="movie-poster-container">
        <img
          src={posterPath}
          alt={movie.original_title}
          className="movie-poster"
          loading="lazy"
        />
        <div className="movie-rating-badge">
          <img src={star} alt="rating" className="star-icon" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
        <div className="movie-favorite">
          <button className="favorite-btn" onClick={toggleFavorite}>
            <img
              src={isFavorite ? heartFilled : heart}
              alt="favorite"
              className="heart-icon"
            />
          </button>
        </div>
      </div>

      <div className="movie-content">
        <h2 className="movie-title">{movie.original_title}</h2>
      </div>
    </article>
  );
}
