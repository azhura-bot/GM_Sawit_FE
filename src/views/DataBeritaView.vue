<template>
  <div class="min-h-screen bg-white p-4 md:p-6">
    <div class="container mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div class="relative w-full md:w-96">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search judul..."
            class="input w-full pl-4 pr-10 py-2 bg-lime-100 rounded-full text-[#134611]"
          />
          <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-black">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
            </svg>
          </span>
        </div>

        <router-link
          to="/tambah-berita"
          class="bg-lime-100 text-black font-semibold px-6 py-2 rounded-full w-full sm:w-auto text-center"
        >
          + Tambah Artikel
        </router-link>
      </div>

      <h1 class="text-3xl md:text-4xl font-extrabold text-green-900 mb-8">Daftar Artikel</h1>

      <!-- Daftar artikel -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="artikel in filteredArticles"
          :key="artikel.id"
          class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <!-- Gambar + tombol overlay -->
          <div class="relative h-40 sm:h-48 bg-gray-300 rounded-t-2xl overflow-hidden">
            <img
              v-if="artikel.image_url"
              :src="artikel.image_url"
              alt="gambar artikel"
              class="object-cover w-full h-full"
            />
            <div class="absolute top-2 right-2 flex gap-2">
              <!-- Edit icon -->
              <router-link
                :to="`/edit-berita/${artikel.id}`"
                class="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                title="Edit Artikel"
              >
                <!-- Inline SVG Pensil -->
                ✏️
              </router-link>

              <!-- Delete icon -->
              <button
                @click="openModal(artikel.id)"
                class="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                title="Hapus Artikel"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
          <!-- Konten -->
          <div class="p-4">
            <h2 class="text-lg font-bold text-green-900 mb-2">{{ artikel.title }}</h2>
            <p class="text-sm text-green-900 mb-4">
              {{ artikel.content.length > 100
                  ? artikel.content.substring(0, 100) + '...'
                  : artikel.content
              }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Konfirmasi Hapus -->
    <div
      v-if="showAlert"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-sm p-6">
        <h3 class="text-xl font-semibold mb-4 text-[#134611]">Konfirmasi Hapus</h3>
        <p class="mb-6 text-[#134611]">Apakah Anda yakin ingin menghapus artikel ini?</p>
        <div class="flex justify-end gap-4">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-black"
          >
            Batal
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

// API base URL
const API_URL = import.meta.env.VITE_API_URL

// State
const articles    = ref([])
const searchQuery = ref('')
const showAlert   = ref(false)
const deleteId    = ref(null)

// Fetch articles
const fetchArticles = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const res = await axios.get(`${API_URL}/api/artikel`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    articles.value = res.data.data.map(a => ({
      ...a,
      image_url: a.image ? `${API_URL}/${a.image}` : null
    }))
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchArticles)

// computed filteredArticles
const filteredArticles = computed(() => {
  if (!searchQuery.value) return articles.value
  const q = searchQuery.value.toLowerCase()
  return articles.value.filter(a =>
    a.title.toLowerCase().includes(q)
  )
})

// Modal logic
const openModal = id => {
  deleteId.value = id
  showAlert.value = true
}
const closeModal = () => {
  deleteId.value = null
  showAlert.value = false
}

// Confirm delete
const confirmDelete = async () => {
  try {
    const token = localStorage.getItem('token')
    await axios.delete(`${API_URL}/api/artikel/${deleteId.value}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    closeModal()
    fetchArticles()
  } catch (err) {
    console.error(err)
  }
}
</script>
