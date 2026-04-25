import "../Styles/MovieInfoCard.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieInfoCard({ movie }) {
  //poster path because movie.poster_path only gives the specific img and not the whole url
  const posterPath = `${IMAGE_BASE_URL}${movie.poster_path}`;

  //Movie info card
  return (
    <div className="movie-info-card">
      <div className="movie-info-poster">
        <img src={posterPath} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p className="movie-info-date">Utgivningsdatum: {movie.release_date}</p>
        <p className="movie-info-overview">{movie.overview}</p>

        <div className="movie-info-stats">
          {/*if genres exists, loops through all genres and displays them in p tags */}
          {movie.genres && (
            <p>Genrer: {movie.genres.map((g) => g.name).join(", ")}</p>
          )}
          {/*rounds the number to get less of extra numbers and it looks better*/}
          <p>Popularitet: {Math.round(movie.popularity)}</p>
        </div>
      </div>
    </div>
  );
}
