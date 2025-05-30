<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Backdrop Image -->
      <div class="relative h-64">
        <img 
          :src="backdropUrl" 
          :alt="movie.title"
          class="w-full h-full object-cover"
        />
        <button 
          @click="$emit('close')"
          class="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
        >
          <XMarkIcon class="w-6 h-6 text-white" />
        </button>
      </div>

      <!-- Movie Info -->
      <div class="p-6">
        <div class="flex items-start gap-6">
          <!-- Poster -->
          <img 
            :src="posterUrl" 
            :alt="movie.title"
            class="w-48 rounded-lg shadow-lg"
          />
          
          <!-- Details -->
          <div class="flex-1">
            <h2 class="text-2xl font-bold mb-2">{{ movie.title }}</h2>
            <div class="flex items-center gap-4 mb-4">
              <div class="flex items-center">
                <StarIcon class="w-5 h-5 text-yellow-400 mr-1" />
                <span>{{ movie.vote_average.toFixed(1) }}</span>
              </div>
              <span>{{ new Date(movie.release_date).toLocaleDateString() }}</span>
              <span>{{ movie.runtime }} min</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-6">{{ movie.overview }}</p>
            
            <!-- Genres -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="genre in movie.genres" 
                :key="genre.id"
                class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
              >
                {{ genre.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- Cast -->
        <div class="mt-8">
          <h3 class="text-xl font-semibold mb-4">Cast</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div 
              v-for="cast in movie.credits?.cast?.slice(0, 6)" 
              :key="cast.id"
              class="text-center"
            >
              <img 
                :src="cast.profile_path ? `https://image.tmdb.org/t/p/w200${cast.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Image'"
                :alt="cast.name"
                class="w-24 h-24 rounded-full object-cover mx-auto mb-2"
              />
              <div class="text-sm font-medium">{{ cast.name }}</div>
              <div class="text-xs text-gray-500">{{ cast.character }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { StarIcon, XMarkIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const backdropUrl = computed(() => {
  return props.movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`
    : 'https://via.placeholder.com/1920x1080?text=No+Backdrop'
})

const posterUrl = computed(() => {
  return props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster'
})
</script> 