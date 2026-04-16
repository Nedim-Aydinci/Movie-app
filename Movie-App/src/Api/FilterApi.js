//Skapar en klass för att styra vad filtrerings-komponenten ska hantera
class Movie {
  constructor(id, title, popularity, releaseDate, posterPath) {
    this.id = id;
    this.title = title;
    this.popularity = popularity;
    this.releaseDate = releaseDate;
    this.posterPath = posterPath;
  }
}

//Funktionen som loopar igenom de egenskaper filtreringen använder
//Använder slice för att bara visa årtalet som datum
function mapMovie(movie) {
  return new Movie(
    movie.id,
    movie.original_title,
    movie.popularity,
    movie.release_date.slice(-4),
    movie.poster_path,
  );
}

async function fetchAllMovies() {
  const response = await fetch("https://jsonfakery.com/movies/infinite-scroll");

  if (!response.ok) {
    throw new Error("Failed to get movies.");
  }

  const data = await response.json();

  return data.data.map(mapMovie);
}

export { fetchAllMovies, Movie };
