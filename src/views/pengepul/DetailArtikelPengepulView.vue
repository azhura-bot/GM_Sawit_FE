<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header">
      <router-link to="/profile-pengepul" class="circle"></router-link>
      <span class="username">{{ 'Pengepul' }}</span>
    </header>

    <!-- Main Content -->
    <main class="content">
      <!-- Tombol Back dan Gambar -->
      <div class="top-section">
        <button class="back-button" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <img :src="getImageUrl()" alt="Foto Artikel" class="detail-image" />
      </div>

      <!-- Detail Artikel -->
      <div class="detail-content">
        <h2>{{ artikel?.title || 'Judul Artikel' }}</h2>
        <p v-html="artikel?.content || artikel?.description || 'Konten tidak tersedia.'"></p>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import fallbackImage from '@/assets/fotosawit.jpg'

export default {
  name: 'DetailArtikelPengepulView',
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
      artikel: null
    }
  },
  mounted() {
    const id = this.$route.params.id
    if (id) this.fetchArtikel(id)
  },
  methods: {
    async fetchArtikel(id) {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(`${this.apiUrl}/api/artikel/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.artikel = response.data.data || response.data
      } catch (error) {
        console.error('Gagal memuat artikel:', error)
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    getImageUrl() {
      const img = this.artikel?.image
              || this.artikel?.image_path
              || this.artikel?.thumbnail

      if (!img) return fallbackImage
      if (/^(https?:)?\/\//.test(img)) return img
      return `${this.apiUrl}/storage/${img}`
    }
  }
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
  
  .username {
    font-weight: bold;
  }
  
  .content {
    background: white;
    margin-top: 12px;
    width: 100%;
    max-width: 430px;
    border-radius: 16px;
    overflow-y: auto;
    flex: 1;
  }
  
  .top-section {
    position: relative;
    background-color: #d3d3d3;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    overflow: hidden;
  }
  
  .back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    z-index: 2;
  }
  
  .detail-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: center;
  }
  
  .detail-content {
    padding: 16px;
  }
  
  .detail-content h2 {
    font-weight: bold;
    color: #134611;
    margin-bottom: 12px;
  }
  
  .detail-content p {
    color: #555;
    font-size: 14px;
    margin-bottom: 12px;
  }
  </style>
  