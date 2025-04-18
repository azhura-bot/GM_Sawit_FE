<template>
    <div class="bg-white min-h-screen px-4 py-6">
      <div class="bg-white rounded-3xl shadow-lg p-6 sm:p-8 w-full max-w-5xl mx-auto">
        <h2 class="text-3xl font-bold text-green-900 mb-8">Data Personal</h2>
  
        <!-- Nama Lengkap -->
        <div class="mb-6">
          <label class="block text-green-900 font-bold mb-1">Nama Lengkap</label>
          <input type="text" class="w-full bg-white text-green-900 px-4 py-3 rounded-full border border-green-200 font-bold" value="Jackson Miguel Wong Ada" disabled />
        </div>
  
        <!-- Email -->
        <div class="mb-6">
          <label class="block text-green-900 font-bold mb-1">Email</label>
          <input type="email" class="w-full bg-white text-green-900 px-4 py-3 rounded-full border border-green-200 font-bold" value="example@gmail.com" disabled />
        </div>
  
        <!-- Nomor Telepon -->
        <div class="mb-6">
          <label class="block text-green-900 font-bold mb-1">Nomor Telephone</label>
          <input type="text" class="w-full bg-white text-green-900 px-4 py-3 rounded-full border border-green-200 font-bold" value="0888-888-999" disabled />
        </div>
  
        <!-- Password Saat Ini -->
        <div class="mb-8">
          <label class="block text-green-900 font-bold mb-1">Password Saat Ini</label>
          <div class="relative">
            <input type="password" class="w-full bg-white text-green-900 px-4 py-3 rounded-full border border-green-200 font-bold pr-12" value="***************" disabled />
            <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-900">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </span>
          </div>
        </div>
  
        <!-- Tombol -->
        <div class="flex flex-wrap justify-end gap-4">
          <button class="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full font-semibold shadow transition">Edit</button>
          <button class="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold shadow transition">Terapkan</button>
        </div>
      </div>
    </div>
  </template>
  

<script setup>
// Jika ada logika/script, bisa ditulis di sini
</script>

<style scoped>
/* Jika mau styling tambahan */
</style>