<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { SunIcon, MoonIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { useMovieStore } from './stores/movie'

const router = useRouter()
const movieStore = useMovieStore()
const isDarkMode = ref(false)
const searchQuery = ref('')
const showSuggestions = ref(false)
const suggestions = ref([])
const searchTimeout = ref(null)

const handleInput = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  
  if (searchQuery.value.trim().length > 2) {
    searchTimeout.value = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${searchQuery.value}&page=1`
        )
        const data = await response.json()
        suggestions.value = data.results.slice(0, 5)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
      }
    }, 300)
  } else {
    suggestions.value = []
  }
}

const selectSuggestion = (movie) => {
  searchQuery.value = movie.title
  showSuggestions.value = false
  handleSearch()
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'search',
      query: { q: searchQuery.value.trim() }
    })
  }
}

const getPosterUrl = (path) => {
  return path
    ? `https://image.tmdb.org/t/p/w200${path}`
    : 'https://via.placeholder.com/200x300?text=No+Poster'
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  // Check for saved theme preference
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDarkMode.value = false
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <nav class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">Movie App</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link 
                to="/" 
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[$route.path === '/' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white']"
              >
                Popular
              </router-link>
              <router-link 
                to="/trending" 
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[$route.path === '/trending' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white']"
              >
                Trending
              </router-link>
              <router-link 
                to="/top-rated" 
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[$route.path === '/top-rated' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white']"
              >
                Top Rated
              </router-link>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Search Bar -->
            <div class="relative w-96">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  @keyup="handleInput"
                  @focus="showSuggestions = true"
                  @blur="setTimeout(() => showSuggestions = false, 200)"
                  type="text"
                  placeholder="Search movies..."
                  class="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 text-lg"
                />
                <MagnifyingGlassIcon class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <!-- Search Suggestions -->
              <div 
                v-if="showSuggestions && suggestions.length > 0"
                class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto"
              >
                <div 
                  v-for="suggestion in suggestions" 
                  :key="suggestion.id"
                  @mousedown="selectSuggestion(suggestion)"
                  class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center space-x-3"
                >
                  <img 
                    :src="getPosterUrl(suggestion.poster_path)" 
                    :alt="suggestion.title"
                    class="w-10 h-15 object-cover rounded"
                  />
                  <div>
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ suggestion.title }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                      {{ new Date(suggestion.release_date).getFullYear() }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Dark Mode Toggle -->
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              <SunIcon v-if="isDarkMode" class="h-5 w-5" />
              <MoonIcon v-else class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
