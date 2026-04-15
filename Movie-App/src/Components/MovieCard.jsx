export default function MovieCard({ movie, onClick = undefined}) {

    return(
        <article className="movie-card" onClick={onClick} role={onClick ? "button" : undefined}>
            <div className="movie-img">
                <img src={movie.poster} />
            </div>
            <div className="movie-info">
                <h1>{movie.title}</h1>
                <span>{movie.rating}</span>
            </div>
        </article>
    )

}