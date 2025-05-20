<template>
  <div class="drawer z-50 relative">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Dashboard Header Card -->
      <div class="m-4 mt-6 bg-[#E9FBD0] rounded-3xl p-6 shadow-md z-50 relative">
        <div class="flex items-center justify-between">
          <!-- Kiri: Icon & Title -->
          <div class="flex items-center gap-4">
            <label
              for="my-drawer"
              class="cursor-pointer w-14 h-14 bg-white rounded-full flex items-center justify-center z-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>

            <div>
              <h1 class="text-green-900 font-bold text-lg">Manajer</h1>
              <p class="text-green-900 text-sm">Dashboard</p>
            </div>
          </div>

          <!-- Kanan: User Info -->
          <div class="flex items-center gap-4">
            <div class="text-right">
              <h1 class="text-green-900 font-bold">{{ user?.name || '-' }}</h1>
              <p class="text-green-900 text-sm">Manajer</p>
            </div>
            <router-link to="/profile">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                class="w-14 h-14 rounded-full hover:brightness-90 transition"
              />
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar Drawer -->
    <div class="drawer-side z-[100]">
      <label for="my-drawer" class="drawer-overlay"></label>
      <div class="menu p-4 w-64 min-h-full bg-white text-base-content text-green-900 shadow-xl">
        <div class="flex flex-col items-center justify-center mb-4">
          <img src="../assets/logo.png" alt="Logo" class="w-24 mb-2" />
          <span class="text-lg font-bold">EcoPalm</span>
        </div>
        <ul class="w-full">
          <li><a href="/dashboard">Beranda</a></li>
          <!-- <li><a href="/tugas">Tugas</a></li> -->
          <li><a href="/data-pengepul">Data Pengepul</a></li>
          <li><a href="/data-berita">Data Artikel</a></li>
          <li><a href="/data-statistik"> Data Statistik Harga</a></li>
          <li><a href="/data-jadwal">Data Permintaan Jadwal</a></li>
          <li><a href="/data-transaksi">Data Transaksi</a></li>
          <li><a href="/data-tugas">Data Tugas</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const user = ref(null)
const router = useRouter()
const apiUrl = 'http://127.0.0.1:8000' // atau sesuaikan base API kamu

const fetchUser = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    console.warn('Token tidak ditemukan, user belum login.')
    return
  }

  try {
    const response = await axios.get(`${apiUrl}/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    user.value = response.data.data || response.data
  } catch (error) {
    console.error('Gagal mendapatkan data user:', error)
    if (error.response && error.response.status === 401) {
      alert('Sesi login sudah habis, silakan login ulang.')
      localStorage.removeItem('token')
      router.push('/login')
    }
  }
}

onMounted(() => {
  fetchUser()
})
</script>



<style scoped>
/* Jika ingin memastikan drawer tidak tertimpa konten lain */
.drawer {
  position: relative;
  z-index: 50;
}
</style>
