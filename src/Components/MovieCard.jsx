import "../Styles/MovieCard.css";
import star from "../assets/star.svg";
import heart from "../assets/heart-red.svg";
import heartFilled from "../assets/heart-red-filled.svg";
import { useState } from "react";
import { Link } from "react-router"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, onClick = undefined }) {
  //useState for saving "favorited" movies to localstorage, checking if it already exists, if it doesnt it adds it
  const [isFavorite, setIsFavorite] = useState(() => {
    const saved = localStorage.getItem("favorites");

    if (!saved) return false;

    const favorites = JSON.parse(saved);

    return favorites.includes(movie.id);
  });

  const posterPath = `${IMAGE_BASE_URL}${movie.poster_path}`;

  const toggleFavorite = (e) => {
    //when favorite is clicked it only clicks on favorite and not the whole card
    e.stopPropagation();

    const saved = localStorage.getItem("favorites");

    let favorites = saved ? JSON.parse(saved) : [];

    //toggle movie id in the favorites array
    if (isFavorite) {
      favorites = favorites.filter((id) => id !== movie.id);
    } else {
      favorites.push(movie.id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <article className="movie-card" onClick={onClick} role={"button"}>
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
    </Link>
  );
}
