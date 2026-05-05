import { create } from "zustand"

export const useMovieStore = create((set) => ({

    movie: [],
    isLoading: false,
    error: null,

    fetchMovies: async (page) => {

        set({ isLoading: true, error: null })

        try {
            const response = await fetch(${page})
            const data = await response.json() 

            set({ movies: data.results, isLoading: false })
        } catch (err) {
            set({ error: err.message, isLoading: false })
        }
    }
}))