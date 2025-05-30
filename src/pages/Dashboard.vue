<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <!-- Overview Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <BaseCard title="Users" value="10" />
      <BaseCard title="Tasks" value="24" />
      <BaseCard title="Sales" value="$1,200" />
      <BaseCard title="Revenue" value="$3,400" />
    </div>
    <!-- Chart Placeholder -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold mb-4">Monthly Sales</h2>
      <ChartLine />
    </div>
  </div>
</template>

<script setup>
// Import reusable components
import BaseCard from '../components/BaseCard.vue'
import ChartLine from '../components/ChartLine.vue'
</script> 