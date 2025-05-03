<template>
  <v-app>
    <div class="flex flex-col min-h-screen">
      <!-- Navbar: Tampilkan hanya salah satu -->
      <Navbar v-if="showNavbar" />
      <NavbarManajer v-else-if="showNavbarManajer" />

      <!-- Konten utama -->
      <v-main class="flex-grow">
        <router-view />
      </v-main>

      <!-- Footer hanya tampil di halaman tertentu -->
      <Footer v-if="showFooter" />
    </div>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import NavbarManajer from './components/NavbarManajer.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

// Navbar biasa (landing, login, register, dashboard)
const navbarRoutes = [
  '/',
  '/login',
  '/register',
  '/dashboard',
  '/landingpage2',
]

// NavbarManajer
const navbarManajerRoutes = [
  '/data-berita',
  '/data-jadwal',
  '/data-pengepul',
  '/data-statistik',
  '/data-transaksi',
  '/edit-berita',
  '/tugas',
  '/main',
  '/profile',
  '/tambah-berita',
  '/tambah-pengepul',
]

// Footer hanya muncul di halaman berikut
const showFooterRoutes = [
  '/',
  '/login',
  '/register',
  '/dashboard',
]

const showNavbar = computed(() => navbarRoutes.includes(route.path))
const showNavbarManajer = computed(() => {
  return navbarManajerRoutes.some(path => route.path.startsWith(path)) && !showNavbar.value
})
const showFooter = computed(() => showFooterRoutes.includes(route.path))
</script>