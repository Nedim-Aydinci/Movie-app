import { create } from "zustand";
import {
  fetchRandomMovie,
  fetchRandomTrailer,
  fetchMoviesForFilter,
  fetchMovieById,
  fetchPopularMovies,
  fetchSearchMovies,
} from "../Api/api";

export const useMovieFetch = create((set) => ({
  movies: [],
  totalPages: 1,
  currentPage: 1,
  randomMovie: null,
  selectedTrailer: null,
  selectedMovie: null,
  currentQuery: "",
  isLoading: false,
  error: null,
  trailerKey: "",
  favoriteMovies: [],

  searchMovies: async (query, page = 1) => {
    set({ isLoading: true, error: null, currentQuery: query });
    try {
      const data = await fetchSearchMovies(query, page);
      set({
        movies: data.movies,
        totalPages: data.totalPages,
        isLoading: false,
        currentPage: page,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  filterMovies: async (page = 1, genre = "") => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchMoviesForFilter(genre, page);
      set({
        movies: data.movies,
        totalPages: data.totalPages,
        currentPage: page,
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  randomMovies: async () => {
    set({ isLoading: true, error: null, randomMovie: null });
    try {
      const data = await fetchRandomMovie();
      set({ randomMovie: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  movieById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchMovieById(id);
      set({ selectedMovie: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchFavorites: async () => {
    const saved = localStorage.getItem("favorites")
    if (!saved) {
      set({ favoriteMovies: [], isLoading: false })
      return;
    }
    const ids = JSON.parse(saved)
    if (ids.length === 0) {
      set({ favoriteMovies: [], isLoading: false })
      return
    }
    set({ isLoading: true, error: null })
    try {
      const movies = await Promise.all(ids.map((id) => fetchMovieById(Number(id))))
      set({favoriteMovies: movies, isLoading: false })
    } catch (err) {
      set({ error: "Kunde inte hämta favoriter: " + err.message, isLoading: false })
    }
  },

  toggleFavorite: (movie) => {
  const saved = localStorage.getItem("favorites");
  let favorites = saved ? JSON.parse(saved) : [];
  const isFav = favorites.includes(movie.id);

  if (isFav) {
    favorites = favorites.filter((id) => id !== movie.id);
  } else {
    favorites.push(movie.id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  
  set((state) => ({
    favoriteMovies: isFav 
      ? state.favoriteMovies.filter(m => m.id !== movie.id)
      : [...state.favoriteMovies, movie] 
  }));
},

  removeFavorite: (movieId) => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      const ids = JSON.parse(saved);
      const updatedIds = ids.filter((id) => id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(updatedIds));
    }

    set((state) => ({
      favoriteMovies: state.favoriteMovies.filter((movie) => movie.id !== movieId),
    }));
  },

  randomTrailer: async () => {
    set({ isLoading: true, error: null });
    try {
      const movieData = await fetchRandomTrailer();

      const trailer = movieData.videos?.results?.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    ) || movieData.videos?.results[0];

      set({ selectedTrailer: { ...movieData, trailerKey: trailer?.key}, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  popularMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchPopularMovies();
      set({ movies: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  clearSelected: () =>
    set({
      selectedMovie: null,
      selectedTrailer: null,
      error: null,
    }),
}));
