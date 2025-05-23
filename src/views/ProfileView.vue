<template>
  <div class="bg-lime-50 min-h-screen p-4 md:p-6">
    <div class="bg-white rounded-3xl shadow-lg p-6 sm:p-8 w-full max-w-5xl mx-auto">
      <h2 class="text-3xl font-bold text-green-900 mb-8">Edit Profil</h2>

      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <!-- Foto Profil -->
        <div class="mb-6">
          <label class="block text-green-900 font-bold mb-1">Foto Profil</label>
          <div class="flex items-center gap-4">
            <img
              v-if="previewPhoto || profilePhotoUrl"
              :src="previewPhoto || profilePhotoUrl"
              alt="Preview"
              class="w-24 h-24 rounded-full object-cover border"
            />
            <input type="file" @change="handlePhotoUpload" accept="image/*" />
          </div>
        </div>

        <!-- Nama Lengkap -->
        <div class="mb-6">
          <label class="block text-green-900 font-bold mb-1">Nama Lengkap</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full bg-white text-green-900 px-4 py-3 rounded-full border border-green-200 font-bold"
          />
        </div>

        <!-- Email -->
        <div class="mb-6">
          <label class="block text-green-900 font-bold mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full bg-white text-green-900 px-4 py-3 rounded-full border border-green-200 font-bold"
          />
        </div>

        <!-- Nomor Telepon -->
        <div class="mb-8">
          <label class="block text-green-900 font-bold mb-1">Nomor Telepon</label>
          <input
            v-model="form.no_phone"
            type="text"
            class="w-full bg-white text-green-900 px-4 py-3 rounded-full border border-green-200 font-bold"
          />
        </div>

        <!-- Tombol -->
        <div class="flex flex-wrap justify-end gap-4">
          <button
            type="submit"
            class="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold shadow transition"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div class="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
        <h3 class="text-xl font-bold text-green-900 mb-4">Notifikasi</h3>
        <p class="text-green-800 mb-6">{{ modalMessage }}</p>
        <button
          @click="showModal = false"
          class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full font-semibold transition"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

const user = ref({})
const form = ref({
  name: '',
  email: '',
  no_phone: ''
})
const previewPhoto = ref(null)
const photoFile = ref(null)

// Modal state
const showModal = ref(false)
const modalMessage = ref('')

// computed untuk membentuk URL lengkap foto profil jika user.photo ada
const profilePhotoUrl = computed(() => {
  if (user.value.photo) {
    if (user.value.photo.startsWith('http') || user.value.photo.startsWith('data:')) {
      return user.value.photo
    }
    return `${apiUrl}/storage/${user.value.photo}`
  }
  return null
})

const fetchProfile = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/profile`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    user.value = res.data.data
    form.value.name = user.value.name || ''
    form.value.email = user.value.email || ''
    form.value.no_phone = user.value.no_phone || ''
    previewPhoto.value = null
  } catch (error) {
    console.error('Gagal mengambil data profil:', error)
  }
}

const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    photoFile.value = file
    previewPhoto.value = URL.createObjectURL(file)
  }
}

const submitForm = async () => {
  try {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('name', form.value.name)
    formData.append('email', form.value.email)
    formData.append('no_phone', form.value.no_phone)
    if (photoFile.value) {
      formData.append('photo', photoFile.value)
    }

    const response = await axios.post(`${apiUrl}/api/profile`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    user.value = response.data.data
    previewPhoto.value = null
    photoFile.value = null

    modalMessage.value = 'Profil berhasil diperbarui.'
    showModal.value = true
  } catch (error) {
    console.error('Gagal menyimpan profil:', error)
    modalMessage.value = 'Gagal memperbarui profil.'
    showModal.value = true
  }
}

onMounted(() => {
  fetchProfile()
})
</script>
