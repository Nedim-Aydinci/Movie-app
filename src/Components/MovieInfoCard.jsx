import "../Styles/MovieInfoCard.css";
import star from "../assets/star.svg";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieInfoCard({ movie, credits }) {
  //poster path because movie.poster_path only gives the specific img and not the whole url

  if (!movie || !credits || !credits.crew || !credits.cast) {
    return <div className="loading">Hämtar information...</div>;
  }

  const posterPath = `${IMAGE_BASE_URL}${movie.poster_path}`;
  const backdropPath = `${IMAGE_BASE_URL}${movie.backdrop_path}`;

  const director = credits.crew.find((person) => person.job === "Director");
  const cast = credits.cast.slice(0, 5);

  //Movie info card
  return (
    <div className="movie-info-card">
      <div className="movie-info-poster">
        <picture>
          <source media="(max-width: 767px)" srcSet={backdropPath} />
          <img src={posterPath} alt={movie.title} />
        </picture>
      </div>
      <div className="movie-info">
        <h1>{movie.title}</h1>

        <p className="genres">
          {movie.genres.slice(0, 2).map((genre) => (
            <span key={genre.id} className="tag">
              {genre.name}
            </span>
          ))}
        </p>

        <div className="date-and-runtime-wrapper">
          <p className="movie-info-date">Release Date: {movie.release_date}</p>
          <p className="run-time">{movie.runtime} minutes</p>
        </div>

        <p className="movie-info-overview">{movie.overview}</p>

        <div className="director-wrapper">
          <p>Director:</p>
          <p id="director">{director.name}</p>
        </div>

        <p>Actors:</p>

        <div className="movie-cast">
          {cast.map((actor) => (
            <span key={actor.id} className="tag">
              {actor.name}
            </span>
          ))}
        </div>

        <div className="movie-info-stats">
          {/*rounds the number to get less of extra numbers and it looks better*/}
          <p>Popularity: {Math.round(movie.popularity)}</p>
          <div className="movie-rating">
            <img src={star} alt="rating" className="star-icon" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
