import '../Styles/Favorites.css'

//lägga till funktionen av ett API senare, just nu mockar jag data för att visa hur det skulle se ut
const mockMovies = [
  { id: 1, title: "Inception", year: 2010, director: "Christopher Nolan", rating: 8.8 },
  { id: 2, title: "The Dark Knight", year: 2008, director: "Christopher Nolan", rating: 9.0 },
  { id: 3, title: "Interstellar", year: 2014, director: "Christopher Nolan", rating: 8.6 },
  { id: 4, title: "The Matrix", year: 1999, director: "The Wachowskis", rating: 8.7 },
  { id: 5, title: "Parasite", year: 2019, director: "Bong Joon-ho", rating: 8.5 },
  { id: 6, title: "Dune", year: 2021, director: "Denis Villeneuve", rating: 8.0 },
]
//lägga till funktionen av ett API senare, just nu mockar jag data för att visa hur det skulle se ut
const watchlist = [
  { id: 7, title: "Oppenheimer", year: 2023, director: "Christopher Nolan", rating: 8.9 },
  { id: 8, title: "Poor Things", year: 2023, director: "Yorgos Lanthimos", rating: 8.0 },
  { id: 9, title: "Past Lives", year: 2023, director: "Celine Song", rating: 7.8 },
]
{/* ersätt med aktuell MovieCard-komponent senare, just nu mockar jag en enkel card för att visa hur det skulle se ut */}
function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="card-top">
        <div className="movie-poster">BILD källa</div>
        <span className="heart">❤️</span>
      </div>
      <div className="movie-info">
        <p><strong>{movie.title}</strong>, {movie.year}</p>
        <p>{movie.director}</p>
        <p>Betyg: ⭐ {movie.rating}</p>
      </div>
    </div>
  )
}

function Favorites() {
  return (
    <div className="page">

{/* ersätt med aktuell navbar senare, just nu mockar jag en enkel navbar för att visa hur det skulle se ut */}
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Logo</h1>
        <div className="nav-links">
          <a href="#">Favoriter</a>
          <a href="#">Profil</a>
        </div>
      </nav>

      <main className="content">

        {/* Favoriter */}
        <section className="section">
          <h2 className="section-title">Dina favoriter</h2>
          <div className="movies-grid">
            {mockMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Watchlist */}
        <section className="section">
          <h2 className="section-title">Din Watchlist</h2>
          <div className="movies-grid">
            {watchlist.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

      </main>
{/* ersätt med aktuell navbar senare, just nu mockar jag en enkel navbar för att visa hur det skulle se ut */}
      {/* Footer */}
      <footer className="footer">Footer</footer>

    </div>
  )
}

export default Favorites