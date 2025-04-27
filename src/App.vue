<template>
  <v-app>

    <Navbar v-if="showNavbar" />
    
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()

// Daftar path di mana Navbar TIDAK ditampilkan
const hideNavbarRoutes = [
  '/home-pengepul',
  '/pengajuan-jadwal',
  '/tugas-utama-pengepul',
  '/detail-tugas-pengepul',
  '/artikel-pengepul',
  '/detail-artikel-pengepul',
   '/harga-pengepul',
   '/laporan-pengepul',
  '/home-petani',
<<<<<<< HEAD
  '/riwayat-petani',  
  '/pengajuan-jadwal-petani',
=======
  '/profile-pengepul',
  '/edit-profile-pengepul'
>>>>>>> 9ad616b8968f9511c0f468b67176c809e557a6d4

]

// Cek apakah path sekarang ada di daftar hideNavbarRoutes
const showNavbar = computed(() => {
  return !hideNavbarRoutes.includes(route.path)
})
</script>
