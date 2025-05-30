import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Trending from '../pages/Trending.vue'
import TopRated from '../pages/TopRated.vue'
import Search from '../pages/Search.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/trending',
      name: 'trending',
      component: Trending
    },
    {
      path: '/top-rated',
      name: 'top-rated',
      component: TopRated
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})

export default router 