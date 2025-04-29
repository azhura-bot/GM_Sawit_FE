<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header">
      <router-link to="/profile-pengepul" class="circle"></router-link>
      <span class="username">Nama Pengguna</span>
    </header>

    <!-- Content -->
    <main class="content">
      <!-- Judul dan Icon -->
      <section class="title-with-icon">
        <img src="@/assets/icon-artikel-trans.png" alt="Icon Artikel" class="icon" />
        <h2>Artikel</h2>
      </section>

      <!-- Search Bar -->
      <div class="search-bar">
        <input
          type="text"
          placeholder="Search..."
          class="search-input"
          v-model="searchQuery"
        />
        <button class="search-button" @click="searchArticles">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </button>
      </div>

      <!-- Artikel List -->
      <div
        v-for="artikel in filteredArticles"
        :key="artikel.id"
        class="article-card"
        @click="goToDetail(artikel.id)"
      >
        <img
          v-if="artikel.image"
          :src="`${API_URL}/storage/${artikel.image}`"
          alt="Foto Artikel"
          class="article-image"
        />
        <img
          v-else
          :src="require('@/assets/fotosawit.jpg')"
          alt="Foto Artikel"
          class="article-image"
        />
        <div class="article-content">
          <h3>{{ artikel.title }}</h3>
          <p>
            {{
              artikel.content
                ? artikel.content.length > 100
                  ? artikel.content.substring(0, 100) + '...'
                  : artikel.content
                : artikel.description
            }}
          </p>
        </div>
        <div class="actions">
          <router-link
            :to="`/edit-berita/${artikel.id}`"
            class="edit-icon"
          >
            <!-- icon edit -->
          </router-link>
          <button @click.stop="openModal(artikel.id)" class="delete-icon">
            <!-- icon delete -->
          </button>
        </div>
      </div>

      <!-- Modal Hapus -->
      <HapusBeritaAlert
        v-if="showAlert"
        :artikel-id="deleteId"
        @close="closeModal"
        @deleted="handleDeleted"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import HapusBeritaAlert from '@/components/HapusBeritaAlert.vue'

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

// State
const articles = ref([])
const searchQuery = ref('')
const showAlert = ref(false)
const deleteId = ref(null)

// Fetch articles dari API Laravel
const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/artikel`)
    // Jika Backend menggunakan Resource Collection
    articles.value = response.data.data || response.data
  } catch (error) {
    console.error('Error fetching articles:', error)
  }
}

// Computed untuk filter search
const filteredArticles = computed(() => {
  if (!searchQuery.value) return articles.value
  return articles.value.filter((artikel) =>
    artikel.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Lifecycle hook
onMounted(() => {
  fetchArticles()
})

// Navigasi ke detail
const goToDetail = (id) => {
  // Ganti sesuai route detail
  window.location.href = `/detail-artikel/${id}`
}

// Modal handlers
const openModal = (id) => {
  deleteId.value = id
  showAlert.value = true
}

const closeModal = () => {
  deleteId.value = null
  showAlert.value = false
}

// Setelah berhasil hapus
const handleDeleted = () => {
  closeModal()
  fetchArticles() // Refresh artikel
}
</script>

<style scoped>
.main-container {
  background-color: #e6f7cf;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  background-color: #164b1b;
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: sticky;
  top: 0;
  z-index: 10;
}
.circle {
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  margin-right: 8px;
}
.username { font-weight: bold; }
.content {
  background: white;
  margin-top: 12px;
  width: 100%; max-width: 430px;
  border-radius: 16px; padding: 16px;
  overflow-y: auto; flex: 1;
}
.title-with-icon { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.title-with-icon .icon { width: 32px; height: 40px; }
.title-with-icon h2 { font-weight: bold; font-size: 24px; color: #134611; }
.search-bar {
  display: flex; align-items: center;
  background-color: #d3f5a7; padding: 8px 12px;
  border-radius: 24px; margin-bottom: 24px;
}
.search-input {
  flex-grow: 1; border: none; background: transparent;
  outline: none; padding-left: 8px; font-size: 16px;
  color: #134611;
}
.search-button { background: none; border: none; cursor: pointer; color: #134611; }
.article-card {
  position: relative;
  background: #ffffff; border: 1px solid #ccc;
  border-radius: 16px; padding: 16px;
  margin-bottom: 16px; box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}
.article-image {
  width: 100%; height: 160px;
  object-fit: cover; object-position: center;
  border-radius: 12px; margin-bottom: 12px;
}
.article-content h3 { font-weight: bold; color: #134611; margin-bottom: 8px; }
.article-content p { color: #555; font-size: 14px; }
.actions { position: absolute; top: 12px; right: 12px; display: flex; gap: 8px; }
.edit-icon, .delete-icon { cursor: pointer; }
</style>