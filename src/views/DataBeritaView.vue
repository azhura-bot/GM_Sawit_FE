<script setup>
import { ref } from 'vue'
import HapusBeritaAlert from '@/components/HapusBeritaAlert.vue'

const showAlert = ref(false)

const openModal = () => {
  showAlert.value = true
}

const closeModal = () => {
  showAlert.value = false
}
</script>

<template>
  <div class="min-h-screen bg-white p-4 md:p-6">
    <div class="container mx-auto">
      <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div class="flex items-center gap-4 w-full md:w-auto">
                <button class="btn bg-lime-100 text-black px-6 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                </svg>
                Filter
                </button>

                <div class="relative w-full md:w-96">
                    <input type="text" placeholder="Search..." class="input w-full pl-4 pr-10 py-2 bg-lime-100 rounded-full" />
                    <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                        </svg>
                    </span>
                </div>
            </div>

            <router-link
                to="/tambah-berita"
                class="bg-lime-100 text-black font-semibold px-6 py-2 rounded-full w-full sm:w-auto inline-block text-center"
                >
                + Tambah Artikel
            </router-link>
        </div>

      <!-- Judul -->
      <h1 class="text-3xl md:text-4xl font-extrabold text-green-900 mb-8">Daftar Artikel</h1>

      <!-- Grid Artikel -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="n in 6"
          :key="n"
          class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <!-- Gambar -->
          <div class="h-40 sm:h-48 bg-gray-300 rounded-t-2xl"></div>

          <!-- Konten -->
          <div class="p-4">
            <h2 class="text-lg font-bold text-green-900 mb-2">Lorem Ipsum</h2>
            <p class="text-sm text-green-900 mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>

            <!-- Action -->
            <div class="flex justify-end items-center gap-3">
              <router-link to="/edit-berita" class="text-orange-500 hover:text-orange-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 21h4l10-10-4-4L4 17v4zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 4.24 4.24 1.83-1.83z"/>
                </svg>
              </router-link>
              <button @click="openModal" class="text-red-600 hover:text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Komponen modal ditampilkan jika showAlert true -->
    <HapusBeritaAlert v-if="showAlert" @close="closeModal" />
  </div>
</template>
