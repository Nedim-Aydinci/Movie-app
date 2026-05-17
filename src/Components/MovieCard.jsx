import "../Styles/MovieCard.css";
import star from "../assets/star.svg";
import heart from "../assets/heart-red.svg";
import heartFilled from "../assets/heart-red-filled.svg";
import { Link } from "react-router";
import { useMovieFetch } from "../Stores/useMovieFetch";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, onClick = undefined }) {
  const { toggleFavorite, favoriteMovies } = useMovieFetch();

  const isFavorite = favoriteMovies.some((m) => m.id === movie.id);

  const posterPath = `${IMAGE_BASE_URL}${movie.poster_path}`;

  const handleToggle = (e) => {
    //when favorite is clicked it only clicks on favorite and not the whole card
    e.stopPropagation();
    e.preventDefault(); //prevent the page from reloading
    toggleFavorite(movie);
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
            <button className="favorite-btn" onClick={handleToggle}>
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
