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
  '/landingpage2',
]

// NavbarManajer
const navbarManajerRoutes = [

  '/dashboard',
  '/data-berita',
  '/data-jadwal',
  '/data-pengepul',
  '/data-statistik',
  '/data-transaksi',
  '/edit-berita',
  '/main',
  '/data-tugas',
  '/tambah-berita',
  '/tambah-pengepul',
  '/data-profile',
]

// Footer hanya muncul di halaman berikut
const showFooterRoutes = [
  '/',
  '/login',
  '/register',
]

const showNavbar = computed(() => navbarRoutes.includes(route.path))
const showNavbarManajer = computed(() => {
  return navbarManajerRoutes.some(path => route.path.startsWith(path)) && !showNavbar.value
})
const showFooter = computed(() => showFooterRoutes.includes(route.path))
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
