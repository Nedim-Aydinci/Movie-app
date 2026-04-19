function MovieFilter() {
  return (
    <>
    <div className="movie-filter-container">
      <div className="movie-filter-controls">
      <label className="movie-filter-controls">
        Sort By Filter
        </label>
      <select className="movie-filter-controls" value={} onChange={}>
        <option value="">- none -</option>
        <option value="title">Title</option>
        <option value="releaseDate">Release Year</option>
        <option value="popularity">Rating</option>
      </select>
      </div>

    </div>
    </>
  );
}

export default MovieFilter;