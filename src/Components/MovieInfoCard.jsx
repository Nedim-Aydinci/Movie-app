export default function MovieInfoCard ({ movie }) {

    return (
        <div className="movie-info-card">
            <div className="movie-info-poster">

            </div>
            <div className="movie-info">
                <h1>{movie.original_title}</h1>
                <p>{movie.release_date}</p>
                <p>{movie.overview}</p>
                <div>
                    <p>{movie.genres.name}</p>
                    <p>{movie.popularity}</p>
                </div>
            </div>            
        </div>
    )
}
