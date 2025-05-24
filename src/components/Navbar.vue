<template>
  <div class="navbar-container">
    <nav class="navbar">
      <!-- Kiri: Foto Profil dan Nama -->
      <div class="profile-container">
        <img src="../assets/logo.png" alt="Profile" class="profile-img" />
        <span class="profile-name">EcoPalm</span>
      </div>

      <!-- Burger Menu (Mobile) -->
      <button @click="toggleMenu" class="burger-menu md:hidden focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Kanan: Menu dan Tombol Auth -->
      <div :class="['menu-container', { 'open': menuOpen }]">
        <!-- Menu Navigasi -->
        <ul class="nav-links">
          <li><router-link to="/" class="nav-link">Beranda</router-link></li>
          <li><a href="#layanan" class="nav-link">Layanan</a></li>
          <li><a href="#tentang" class="nav-link">Tentang</a></li>
          <li><a href="#kontak" class="nav-link">Kontak</a></li>
        </ul>
        <!-- Tombol Sign In / Sign Up -->
        <div class="auth-buttons gap-3">
          <router-link to="/login"><button class="auth-btn">Sign In</button></router-link>
          <router-link to="/register"><button class="auth-btn">Sign Up</button></router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
const toggleMenu = () => { menuOpen.value = !menuOpen.value }
</script>

<style scoped>
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.navbar-container {
  width: 100%;
  animation: fadeInDown 0.6s ease-out;
}

.navbar {
  background-color: #134611;
  color: white;
  padding: 1rem 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.profile-container {
  display: flex;
  align-items: center;
  gap: 12px;
}
.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s;
}
.profile-container:hover .profile-img { transform: scale(1.05); }
.profile-name {
  font-weight: 600;
  font-size: 1.125rem;
  transition: color 0.3s;
}
.profile-container:hover .profile-name { color: #d1fae5; }

/* Burger disatukan di pojok kanan */
.burger-menu {
  display: block;
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  z-index: 50;
}
@media (min-width: 768px) {
  .burger-menu { display: none; }
}

.menu-container {
  display: flex;
  align-items: center;
  gap: 32px; /* tambahkan jarak antar menu dan auth */
}

/* Mobile: hide nav-links and auth-buttons by default */
@media (max-width: 767px) {
  .nav-links,
  .auth-buttons {
    display: none;
  }
  .menu-container.open .nav-links,
  .menu-container.open .auth-buttons {
    display: flex;
  }
  .nav-links {
    flex-direction: column;
    background: #134611;
    width: 100%;
    gap: 16px;
    padding: 1rem 0;
  }
  .auth-buttons {
    flex-direction: column;
    background: #134611;
    width: 100%;
    gap: 16px;
    padding-bottom: 1rem;
  }
}

/* Desktop: always show menu */
@media (min-width: 768px) {
  .nav-links,
  .auth-buttons {
    display: flex !important;
  }
  .nav-links { flex-direction: row; }
  .auth-buttons { flex-direction: row; }
}

.nav-links li,
.auth-buttons button {
  padding: 0.5rem 1rem; /* tambahkan padding agar teks lebih berjarak */
}

.nav-link {
  font-weight: 500;
  position: relative;
  transition: color 0.3s;
  color: white;
}
.nav-link::after {
  content: "";
  display: block;
  width: 0;
  height: 2px;
  background: white;
  transition: width 0.3s;
  margin-top: 2px;
}
.nav-link:hover::after { width: 100%; }
.nav-link:hover { color: #d1fae5; }

.auth-btn {
  background-color: white;
  color: #134611;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: 2px solid #134611;
  border-radius: 50px;
  transition: all 0.2s ease-in-out;
}
.auth-btn:hover {
  color: white;
  background-color: #134611;
  transform: scale(1.05);
}
</style>
