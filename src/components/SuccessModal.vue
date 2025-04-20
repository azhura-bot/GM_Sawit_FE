<!-- components/SuccessModal.vue -->
<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div class="bg-white p-10 rounded-3xl shadow-lg text-center w-[500px]">
        <div class="flex justify-center mb-4">
          <div class="bg-green-500 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <p class="text-green-800 font-bold text-lg">Data berhasil diperbaharui</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  defineProps({
    isVisible: Boolean
  })
  </script>
  