<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <form @submit.prevent="login" class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Login</h2>
      <div class="mb-4">
        <label class="block mb-1 text-gray-700 dark:text-gray-200">Email</label>
        <input v-model="email" type="email" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100" />
      </div>
      <div class="mb-6">
        <label class="block mb-1 text-gray-700 dark:text-gray-200">Password</label>
        <input v-model="password" type="password" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100" />
      </div>
      <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

// State for form fields
const email = ref('')
const password = ref('')
const router = useRouter()
const toast = useToast()

// Login handler
const login = async () => {
  try {
    // Call dummy API for authentication
    const res = await axios.post('https://reqres.in/api/login', {
      email: email.value,
      password: password.value
    })
    // Save token to localStorage
    localStorage.setItem('token', res.data.token)
    toast.success('Login successful!')
    // Redirect to dashboard
    router.push('/')
  } catch (err) {
    toast.error('Login failed. Please check your credentials.')
  }
}
</script> 