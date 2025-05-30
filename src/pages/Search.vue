<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Search Results: {{ movieStore.searchQuery }}</h1>
    
    <!-- Loading State -->
    <div v-if="movieStore.loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="movieStore.error" class="text-red-500 text-center p-4">
      {{ movieStore.error }}
    </div>

    <!-- No Results -->
    <div v-else-if="movieStore.movies.length === 0" class="text-center p-8">
      <p class="text-gray-500">No movies found for your search.</p>
    </div>

    <!-- Movie Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div 
        v-for="movie in movieStore.movies" 
        :key="movie.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
        @click="showMovieDetails(movie)"
      >
        <img 
          :src="movieStore.getPosterUrl(movie.poster_path)" 
          :alt="movie.title"
          class="w-full h-[400px] object-cover"
        />
        <div class="p-4">
          <h3 class="font-semibold text-lg mb-2 line-clamp-1">{{ movie.title }}</h3>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <StarIcon class="w-5 h-5 text-yellow-400 mr-1" />
              <span>{{ movie.vote_average.toFixed(1) }}</span>
            </div>
            <span class="text-sm text-gray-500">{{ new Date(movie.release_date).getFullYear() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="movieStore.totalPages > 1" class="mt-8 flex justify-center">
      <div class="flex space-x-2">
        <button 
          v-for="page in Math.min(5, movieStore.totalPages)" 
          :key="page"
          @click="changePage(page)"
          class="px-4 py-2 rounded-lg"
          :class="[
            movieStore.currentPage === page 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>

    <!-- Movie Details Modal -->
    <MovieDetailsModal 
      v-if="selectedMovie"
      :movie="selectedMovie"
      @close="selectedMovie = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { StarIcon } from '@heroicons/vue/24/solid'
import { useMovieStore } from '../stores/movie'
import MovieDetailsModal from '../components/MovieDetailsModal.vue'

const route = useRoute()
const movieStore = useMovieStore()
const selectedMovie = ref(null)

const performSearch = () => {
  const query = route.query.q
  if (query) {
    movieStore.searchMovies(query, 1)
  }
}

onMounted(() => {
  performSearch()
})

watch(() => route.query.q, () => {
  performSearch()
})

const showMovieDetails = async (movie) => {
  await movieStore.fetchMovieDetails(movie.id)
  selectedMovie.value = movieStore.currentMovie
}

const changePage = (page) => {
  const query = route.query.q
  if (query) {
    movieStore.searchMovies(query, page)
  }
}
</script> 