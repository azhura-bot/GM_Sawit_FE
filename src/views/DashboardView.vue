<template>
    <div class="p-4 space-y-6 w-full">
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- Task Total -->
        <div class="bg-lime-100 p-6 rounded-2xl shadow-md text-center">
          <h2 class="text-green-900 font-bold mb-4">Task Total</h2>
          <div class="text-5xl font-extrabold text-green-900">12</div>
        </div>
  
        <!-- Ongoing -->
        <div class="bg-green-300 p-6 rounded-2xl shadow-md text-center">
          <h2 class="text-green-900 font-bold mb-4">Ongoing Total</h2>
          <div class="text-5xl font-extrabold text-green-900">05</div>
        </div>
  
        <!-- Completed -->
        <div class="bg-green-700 p-6 rounded-2xl shadow-md text-center">
          <h2 class="text-white font-bold mb-4">Task Completed</h2>
          <div class="text-5xl font-extrabold text-white">03</div>
        </div>
      </div>
  
      <!-- Filter Badges -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-pink-200 text-pink-900 px-4 py-2 rounded-full font-semibold text-center w-full">
          Task yang belum dikerjakan
          <span class="ml-2 bg-white px-2 py-1 rounded-full">3</span>
        </div>
  
        <div class="bg-lime-100 text-green-900 px-4 py-2 rounded-full font-semibold text-center w-full">
          Task yang sudah dikerjakan
          <span class="ml-2 bg-white px-2 py-1 rounded-full">3</span>
        </div>
  
        <div class="bg-blue-100 text-blue-900 px-4 py-2 rounded-full font-semibold text-center w-full">
          Task yang sedang dikerjakan
          <span class="ml-2 bg-white px-2 py-1 rounded-full">3</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // No JS logic yet, static component
  </script>
  