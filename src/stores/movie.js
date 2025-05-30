import { defineStore } from 'pinia'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [],
    currentMovie: null,
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
    searchQuery: '',
  }),

  actions: {
    async fetchMovies(type = 'popular', page = 1) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${BASE_URL}/movie/${type}`, {
          params: {
            api_key: API_KEY,
            page,
            language: 'en-US',
          },
        })
        this.movies = response.data.results
        this.totalPages = response.data.total_pages
        this.currentPage = page
      } catch (error) {
        this.error = 'Failed to fetch movies'
        console.error('Error fetching movies:', error)
      } finally {
        this.loading = false
      }
    },

    async searchMovies(query, page = 1) {
      this.loading = true
      this.error = null
      this.searchQuery = query
      try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
          params: {
            api_key: API_KEY,
            query,
            page,
            language: 'en-US',
          },
        })
        this.movies = response.data.results
        this.totalPages = response.data.total_pages
        this.currentPage = page
      } catch (error) {
        this.error = 'Failed to search movies'
        console.error('Error searching movies:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchMovieDetails(id) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            append_to_response: 'videos,credits',
          },
        })
        this.currentMovie = response.data
      } catch (error) {
        this.error = 'Failed to fetch movie details'
        console.error('Error fetching movie details:', error)
      } finally {
        this.loading = false
      }
    },

    clearCurrentMovie() {
      this.currentMovie = null
    },
  },

  getters: {
    getPosterUrl: () => (path) => {
      return path
        ? `https://image.tmdb.org/t/p/w500${path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster'
    },
  },
}) 