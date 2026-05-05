import { create } from "zustand";
import {
  fetchRandomMovie,
  fetchMovieTrailers,
  fetchMoviesForFilter,
  fetchMovieById,
  fetchPopularMovies,
  fetchSearchMovies,
} from "../Api/api";

export const useMovieFetch = create((set, get) => ({
  movies: [],
  totalPages: 1,
  currentPage: 1,
  randomMovie: null,
  selectedTrailer: null,
  selectedMovie: null,
  currentQuery: "",
  isLoading: false,
  error: null,

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
    set({ isLoading: true, error: null });
    try {
      const data = await fetchRandomMovie();
      set({ randomMovie: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  movieById: async (id) => {
    set({ isLoading: true, error: null})
    try {
        const data = await fetchMovieById(id)
        set({selectedMovie: data, isLoading: false})
    } catch (err) {
        set({error: err.message, isLoading: false})
    }
  },

  randomTrailer: async (movieId) => {
    set({isLoading: true, error: null})
    try {
        const video = await fetchMovieTrailers(movieId)

        const trailer = video.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      ) || video[0];
        set({selectedTrailer: trailer, isLoading: false})
    } catch (err) {
        set({error: err.message, isLoading: false})
    }
  },

  popularMovies: async () => {
    set({isLoading: true, error: null})
    try {
        const data = await fetchPopularMovies()
        set({movies: data, isLoading: false})
    } catch (err) {
        set({error: err.message, isLoading: false})
    }
  },

  clearSelected: () => set({ 
    selectedMovie: null, 
    selectedTrailer: null, 
    error: null 
  }),
}));
