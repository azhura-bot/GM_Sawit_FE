<template>
  <!-- Background halaman -->
  <div class="min-h-screen bg-gray-100 flex justify-center ">
    <!-- Kontainer Artikel -->
    <div class=" w-full bg-white rounded-3xl p-8 shadow-lg relative">
      <!-- Modal Edit -->
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
        <div class="bg-white rounded-2xl shadow-xl w-[700px] p-8 flex flex-col gap-6 animate-fade-in-scale">
          <h3 class="text-green-900 font-bold text-xl">Edit Data Pengepul</h3>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm text-gray-600">Nama Pengepul</label>
              <input
                type="text"
                v-model="form.name"
                class="w-full border rounded-xl px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-300 text-black"
              />
            </div>
            <div>
              <label class="text-sm text-gray-600">Tanggal Perekrutan</label>
              <input
                type="date"
                v-model="form.tanggal"
                class="w-full border rounded-xl px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-300 text-black"
              />
            </div>
            <div>
              <label class="text-sm text-gray-600">Email</label>
              <input
                type="email"
                v-model="form.email"
                class="w-full border rounded-xl px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-300 text-black"
              />
            </div>
            <div>
              <label class="text-sm text-gray-600">Nomor Handphone</label>
              <input
                type="text"
                v-model="form.nomor"
                class="w-full border rounded-xl px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-300 text-black"
              />
            </div>
          </div>

          <div class="flex justify-center gap-4 mt-4">
            <button
              @click="showModal = false"
              class="bg-[#00A5E0] text-white font-semibold px-6 py-2 rounded-full text-sm"
            >
              Batalkan
            </button>
            <button
              @click="simpanPerubahan"
              class="bg-[#3E8914] text-white font-semibold px-6 py-2 rounded-full text-sm"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Delete -->
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30"
      >
        <div class="bg-white rounded-2xl shadow-xl w-[400px] p-8 flex flex-col items-center gap-6 animate-fade-in-scale">
          <img src="/warning-image.png" alt="Warning" class="w-16 h-16" />
          <h3 class="text-green-900 font-bold text-2xl">Apakah anda yakin?</h3>
          <p class="text-gray-800 text-center text-lg">Untuk menghapus data pengepul ini?</p>
          <div class="flex gap-4">
            <button
              @click="showDeleteModal = false"
              class="bg-[#00A5E0] text-white font-semibold px-6 py-2 rounded-full text-sm"
            >
              Tidak
            </button>
            <button
              @click="hapusPengepul"
              class="bg-[#3E8914] text-white font-semibold px-6 py-2 rounded-full text-sm"
            >
              Ya
            </button>
          </div>
        </div>
      </div>

      <!-- Header dan Search -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-6">
        <div class="w-full md:w-1/2 bg-[#DDF7B1] rounded-full flex items-center px-4 py-2 text-green-900">
          <input
            type="text"
            placeholder="Search..."
            class="bg-transparent outline-none w-full"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-900" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </div>

        <div class="flex gap-3 mt-4 md:mt-0">
          <button class="bg-gray-200 text-green-900 px-4 py-2 rounded-full text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 8h18v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" />
            </svg>
            Filter
          </button>
          <router-link
            to="/tambah-pengepul"
            class="bg-[#DDF7B1] text-green-900 px-4 py-2 rounded-full text-sm"
          >
            + Tambah Pengepul
          </router-link>
        </div>
      </div>

      <!-- Judul -->
      <h2 class="font-bold text-green-800 text-xl mb-4">Data Pengepul</h2>

      <!-- Grid card pengepul -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
        v-for="pengepul in pengepulList"
        :key="pengepul.id"
        class="bg-white shadow-lg p-6 rounded-2xl relative flex flex-col gap-4 text-center text-green-900 transform transition-all hover:scale-105 hover:shadow-2xl">
        
        <!-- Nama Pengepul -->
        <p class="font-bold text-2xl text-green-800">{{ pengepul.name }}</p>

        <!-- Tanggal Perekrutan -->
        <p class="text-sm text-gray-600">{{ formatDate(pengepul.created_at) }}</p>

        <!-- Email -->
        <p class="mt-2 text-sm text-gray-700">
          <strong>Email:</strong> {{ pengepul.email }}
        </p>

        <!-- Nomor Handphone -->
        <p class="mt-1 text-sm text-gray-600">
          <strong>Nomor Handphone:</strong> {{ pengepul.no_phone || 'Nomor Handphone tidak tersedia' }}
        </p>

        <!-- Tombol Aksi -->
        <div class="absolute top-2 right-2 flex gap-2">
          <button @click="openEdit(pengepul)" class="text-orange-500 hover:text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 16H9v-2.828z" />
            </svg>
          </button>
          <button @click="openDelete(pengepul)" class="text-red-500 hover:text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7" />
            </svg>
          </button>
        </div>
      </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const showModal = ref(false)
const showDeleteModal = ref(false)
const form = ref({
  id: null,    // <- tambah ID untuk tracking siapa yang di-edit
  name: '',
  tanggal: '',
  email: '',
  nomor: '',
})

const pengepulList = ref([])
const pengepulIdToDelete = ref(null) // <- id yang mau dihapus

// Ambil data pengepul saat komponen dimuat
onMounted(fetchPengepul)

// Fungsi ambil semua pengepul
async function fetchPengepul() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/pengepul')
    pengepulList.value = response.data.data
  } catch (error) {
    console.error('Gagal mengambil data pengepul:', error)
  }
}

// Buka modal edit
const openEdit = (pengepul) => {
  form.value = {
    id: pengepul.id,
    name: pengepul.name,
    tanggal: pengepul.created_at.split('T')[0],
    email: pengepul.email,
    nomor: pengepul.no_phone || '',
  }
  showModal.value = true
}

// Simpan perubahan pengepul (UPDATE)
const simpanPerubahan = async () => {
  try {
    const payload = {
      name: form.value.name,
      email: form.value.email,
      no_phone: form.value.nomor,
      tanggal: form.value.tanggal,
    }

    await axios.put(`http://127.0.0.1:8000/api/pengepul/${form.value.id}`, payload)

    showModal.value = false
    await fetchPengepul() // refresh data
  } catch (error) {
    console.error('Gagal update pengepul:', error)
  }
}

// Buka modal hapus
const openDelete = (pengepul) => {
  pengepulIdToDelete.value = pengepul.id
  showDeleteModal.value = true
}

// Hapus pengepul (DELETE)
const hapusPengepul = async () => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/pengepul/${pengepulIdToDelete.value}`)

    showDeleteModal.value = false
    await fetchPengepul() // refresh data
  } catch (error) {
    console.error('Gagal hapus pengepul:', error)
  }
}

// Format tanggal
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

