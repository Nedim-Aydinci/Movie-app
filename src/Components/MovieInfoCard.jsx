import "../Styles/MovieInfoCard.css"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieInfoCard ({ movie }) {

    const posterPath = `${IMAGE_BASE_URL}${movie.poster_path}`
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
                    {movie.genres && <p>Genrer: {movie.genres.map(g => g.name).join(", ")}</p>}
                    <p>Popularitet: {Math.round(movie.popularity)}</p>
                </div>
            </div>            
        </div>
    )
}
