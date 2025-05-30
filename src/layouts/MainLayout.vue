<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
      <div class="h-16 flex items-center justify-center font-bold text-xl border-b dark:border-gray-700">
        MovieHub
      </div>
      <nav class="flex-1 py-4">
        <ul>
          <li v-for="item in menu" :key="item.name">
            <router-link 
              :to="item.to" 
              class="block px-6 py-3 rounded-lg mb-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700" 
              :class="{'bg-gray-200 dark:bg-gray-700 font-semibold': $route.name === item.name}"
            >
              <span class="inline-flex items-center">
                <component :is="item.icon" class="w-5 h-5 mr-2" />
                {{ item.label }}
              </span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Topbar with Search -->
      <header class="h-16 bg-white dark:bg-gray-800 shadow flex items-center px-6 justify-between">
        <div class="flex-1 max-w-2xl">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search movies..."
              class="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              @input="handleSearch"
            />
            <MagnifyingGlassIcon class="w-5 h-5 absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>
        <div class="ml-4">
          <button 
            @click="toggleTheme"
            class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <SunIcon v-if="isDark" class="w-5 h-5" />
            <MoonIcon v-else class="w-5 h-5" />
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  HomeIcon, 
  FireIcon, 
  StarIcon, 
  SunIcon, 
  MoonIcon,
  MagnifyingGlassIcon 
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { useMovieStore } from '../stores/movie'

const router = useRouter()
const movieStore = useMovieStore()
const searchQuery = ref('')
const isDark = ref(false)

const menu = [
  { name: 'Home', label: 'Home', to: '/', icon: HomeIcon },
  { name: 'Trending', label: 'Trending', to: '/trending', icon: FireIcon },
  { name: 'TopRated', label: 'Top Rated', to: '/top-rated', icon: StarIcon },
]

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ 
      name: 'Search', 
      query: { q: searchQuery.value }
    })
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
</script> 