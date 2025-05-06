<template>
  <div class="min-h-screen bg-lime-100 p-4 sm:p-10">
    <div class="max-w-5xl mx-auto bg-lime-100 rounded-3xl">
      <h1 class="text-4xl font-extrabold text-green-900 mb-8">Edit Artikel</h1>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Upload Thumbnail (kolom ke-1) -->
        <div class="col-span-1">
          <label class="label">
            <span class="label-text text-green-900 font-medium">Thumbnail</span>
          </label>
          <div
            class="border-dashed border-4 border-green-400 bg-white rounded-xl h-40 flex items-center justify-center cursor-pointer overflow-hidden"
            @click="triggerFile"
          >
            <input type="file" class="hidden" ref="fileInput" @change="handleFileUpload" />
            <!-- Preview baru jika memilih file -->
            <img
              v-if="thumbnail"
              :src="thumbnailPreview"
              alt="preview baru"
              class="object-cover w-full h-full"
            />
            <!-- Preview gambar lama jika tidak ada file baru -->
            <img
              v-else-if="currentImage"
              :src="`${API_URL}/storage/${currentImage}`"
              alt="preview thumbnail"
              class="object-cover w-full h-full"
            />
            <!-- Placeholder jika tidak ada gambar -->
            <div v-else class="text-center text-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-2 h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM5 5h14v10.586l-3.293-3.293a1 1 0 0 0-1.414 0L11 16l-2.293-2.293a1 1 0 0 0-1.414 0L5 16.586V5z"/>
              </svg>
              <span>Klik untuk ubah thumbnail</span>
            </div>
          </div>
        </div>

        <!-- Judul dan Konten (kolom ke-2 & 3) -->
        <div class="col-span-1 md:col-span-2 grid grid-cols-1 gap-6">
          <div>
            <label class="label">
              <span class="label-text text-green-900 font-medium">Judul</span>
            </label>
            <input
              v-model="judul"
              type="text"
              class="input input-bordered w-full rounded-full"
            />
          </div>

          <div>
            <label class="label">
              <span class="label-text text-green-900 font-medium">Isi Artikel</span>
            </label>
            <textarea
              v-model="isiArtikel"
              class="textarea textarea-bordered w-full min-h-[10rem] rounded-2xl"
            ></textarea>
          </div>

          <div class="flex justify-start mt-4">
            <button
              type="submit"
              class="btn bg-green-700 hover:bg-green-800 text-white text-lg rounded-full px-8 py-2"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

// Base API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Router
const route = useRoute()
const router = useRouter()
const id = route.params.id

// State
const judul = ref('')
const isiArtikel = ref('')
const currentImage = ref('')
const thumbnail = ref(null)
const fileInput = ref(null)

// Generate preview URL untuk file baru
const thumbnailPreview = computed(() => {
  return thumbnail.value ? URL.createObjectURL(thumbnail.value) : ''
})

// File input handlers
const triggerFile = () => fileInput.value.click()
const handleFileUpload = (e) => {
  thumbnail.value = e.target.files[0]
}

// Ambil token dari localStorage
const getAuthToken = () => {
  return localStorage.getItem('token') // Ganti dengan nama yang sesuai jika diperlukan
}

// Tambahkan token pada header
const getAuthHeaders = () => {
  const token = getAuthToken()
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

// Fetch existing article data
const fetchArticle = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/artikel/${id}`, {
      headers: getAuthHeaders() // Kirim header dengan token
    })
    judul.value = data.data.title
    isiArtikel.value = data.data.content
    currentImage.value = data.data.image
  } catch (error) {
    console.error('Error fetching article:', error)
  }
}

// Submit update form
const submitForm = async () => {
  const formData = new FormData()
  formData.append('title', judul.value)
  formData.append('content', isiArtikel.value)
  if (thumbnail.value) formData.append('image', thumbnail.value)

  try {
    await axios.post(
      `${API_URL}/api/artikel/${id}?_method=PUT`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...getAuthHeaders() // Kirim header dengan token
        }
      }
    )
    router.push('/daftar-berita')
  } catch (error) {
    console.error('Error updating article:', error)
    // TODO: tampilkan notifikasi error
  }
  router.push('/data-berita')
}

onMounted(fetchArticle)
</script>

<style scoped>
</style>