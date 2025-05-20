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

          <img 
            v-if="form.photoPreview || form.currentPhoto" 
            :src="form.photoPreview || form.currentPhoto" 
            alt="Foto Pengepul" 
            class="w-24 h-24 rounded-full mx-auto object-cover"
          />
          <div v-else class="w-24 h-24 rounded-full mx-auto bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>

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
                placeholder="081234567890"
              />
            </div>
            <div>
              <label class="text-sm text-gray-600">Upload Foto (opsional)</label>
              <input
                type="file"
                @change="onPhotoChange"
                accept="image/*"
                class="w-full border rounded-xl px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-300 text-black"
              />
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

      <!-- Header dan Search + Import -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-6">
        <div class="w-full md:w-1/3 bg-[#DDF7B1] rounded-full flex items-center px-4 py-2 text-green-900 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search..."
            class="bg-transparent outline-none w-full"
            v-model="search"
            @input="filterList"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-900" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </div>

        <div class="flex gap-3">
          <a href="/files/Contoh_Excel.xlsx" download class="bg-gray-200 text-green-900 px-4 py-2 rounded-full text-sm inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12v8m4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Contoh Excel
          </a>
          <router-link
            to="/tambah-pengepul"
            class="bg-[#DDF7B1] text-green-900 px-4 py-2 rounded-full text-sm"
          >
            + Tambah Pengepul
          </router-link>
          <label class="bg-[#F0E68C] text-green-900 px-4 py-2 rounded-full text-sm cursor-pointer">
            Import Excel
            <input type="file" class="hidden" @change="importExcel" accept=".xlsx, .xls" />
          </label>
        </div>
      </div>

      <!-- Judul -->
      <h2 class="font-bold text-green-800 text-xl mb-4">Data Pengepul</h2>

      <!-- Grid card pengepul -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="item in filteredList"
          :key="item.id"
          class="bg-white shadow-lg p-6 rounded-2xl flex flex-col items-center gap-4 text-green-900 transform transition-all hover:scale-105 hover:shadow-2xl">

          <div v-if="item.photo_url" class="w-24 h-24 rounded-full overflow-hidden">
            <img :src="item.photo_url" alt="Foto Pengepul" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-24 h-24 rounded-full overflow-hidden">
            <img src="/profile.png" alt="Default Profile" class="w-full h-full object-cover" />
          </div>

          <!-- Nama Pengepul -->
          <p class="font-bold text-2xl text-green-800">{{ item.name }}</p>

          <!-- Tanggal Perekrutan -->
          <p class="text-sm text-gray-600">{{ formatDate(item.created_at) }}</p>

          <!-- Email -->
          <p class="mt-2 text-sm text-gray-700 w-full text-left">
            <strong>Email:</strong> {{ item.email }}
          </p>

          <!-- Nomor Handphone -->
          <p class="mt-1 text-sm text-gray-600 w-full text-left">
            <strong>Nomor HP:</strong> {{ item.no_phone || 'Tidak tersedia' }}
          </p>

          <!-- Tombol Aksi -->
          <div class="flex gap-4 mt-4">
            <button
              @click="openEdit(item)"
              class="bg-[#00A5E0] text-white px-4 py-2 rounded-full text-sm"
            >
              Edit
            </button>
            <button
              @click="openDelete(item)"
              class="bg-[#F56565] text-white px-4 py-2 rounded-full text-sm"
            >
              Delete
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

const token = localStorage.getItem('token')
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: { Authorization: `Bearer ${token}` }
})

const pengepulList = ref([])
const filteredList = ref([])
const search = ref('')
const showModal = ref(false)
const showDeleteModal = ref(false)
const pengepulIdToDelete = ref(null)

const form = ref({
  id: null,
  name: '',
  tanggal: '',
  email: '',
  nomor: '',
  currentPhoto: null,
  photo: null,
  photoPreview: null
})

onMounted(fetchPengepul)

async function fetchPengepul() {
  const res = await api.get('/pengepul')
  pengepulList.value = res.data.data
  filteredList.value = pengepulList.value
}

function filterList() {
  const q = search.value.toLowerCase()
  filteredList.value = pengepulList.value.filter(i => i.name.toLowerCase().includes(q))
}

function openEdit(item) {
  form.value = {
    id: item.id,
    name: item.name,
    tanggal: item.created_at.split('T')[0],
    email: item.email,
    nomor: item.no_phone || '',
    currentPhoto: item.photo_url,
    photo: null,
    photoPreview: null
  }
  showModal.value = true
}

function onPhotoChange(e) {
  const file = e.target.files[0]
  if (!file) return
  form.value.photo = file
  form.value.photoPreview = URL.createObjectURL(file)
}

async function simpanPerubahan() {
  const data = new FormData()
  data.append('name', form.value.name)
  data.append('email', form.value.email)
  data.append('no_phone', form.value.nomor)
  data.append('tanggal', form.value.tanggal)
  if (form.value.photo) data.append('photo', form.value.photo)
  // Method override for Laravel PUT
  data.append('_method', 'PUT')

  await api.post(`/pengepul/${form.value.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
  showModal.value = false
  await fetchPengepul()
}

async function openDelete(item) {
  pengepulIdToDelete.value = item.id
  showDeleteModal.value = true
}

async function hapusPengepul() {
  await api.delete(`/pengepul/${pengepulIdToDelete.value}`)
  showDeleteModal.value = false
  await fetchPengepul()
}

async function importExcel(e) {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await api.post('/pengepul/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('Import response:', res.data);

    if (res.data.success) {
      // berhasil
      await fetchPengepul();
      alert(res.data.message || 'Import sukses!');
    } else {
      // kalau API mengembalikan success: false
      alert(res.data.message || 'Import gagal tanpa error.');
    }
  } catch (err) {
    console.error('Error saat import:', err.response || err);
    alert('Gagal import: ' + (err.response?.data?.message || err.message));
  }
}


function formatDate(dt) {
  if (!dt) return ''
  const d = new Date(dt)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}
</script>
