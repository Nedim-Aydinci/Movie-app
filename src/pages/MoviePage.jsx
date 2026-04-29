import { useParams } from "react-router"
import { useState, useEffect } from "react"
import MovieInfoCard from "../Components/MovieInfoCard"

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function MoviePage() {

    const { id } = useParams()
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${TMDB_TOKEN}`,
                accept: "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => setMovie(data))
        .catch((error) => console.error("Error fetching movie", error))
    }, [id])

    if(!movie) return <p>Laddar...</p>
    
    return (
        <>
        <MovieInfoCard movie={movie} />
        </>
    )
}