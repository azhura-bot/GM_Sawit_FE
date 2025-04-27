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
  '/home-petani',
  '/riwayat-petani',  
  '/pengajuan-jadwal-petani',

]

// Cek apakah path sekarang ada di daftar hideNavbarRoutes
const showNavbar = computed(() => {
  return !hideNavbarRoutes.includes(route.path)
})
</script>
