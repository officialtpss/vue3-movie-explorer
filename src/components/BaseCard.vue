<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
    <div class="text-gray-500 dark:text-gray-400 text-sm mb-1">{{ title }}</div>
    <div class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ value }}</div>
  </div>
</template>

<script setup>
// Props for card title and value
const props = defineProps({
  title: String,
  value: [String, Number]
})
</script> 