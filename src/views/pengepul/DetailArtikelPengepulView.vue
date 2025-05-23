<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header flex items-center p-4 bg-white shadow">
      <router-link to="/profile" class="inline-block mr-3">
        <img
          :src="user.photo_url || defaultPhoto"
          alt="Foto Profil"
          class="circle"
        />
      </router-link>
      <span class="username font-semibold text-white-800">
        {{ user.name || 'Nama User' }}
      </span>
    </header>

    <!-- Main Content -->
    <main class="content">
      <!-- Tombol Back dan Gambar Artikel -->
      <div class="top-section flex items-center mb-6">
        <button class="back-button mr-4" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <img
          :src="artikel?.image_url"
          alt="Foto Artikel"
          class="detail-image rounded-lg shadow"
        />
      </div>

      <!-- Detail Artikel -->
      <div class="detail-content">
        <h2 class="text-2xl font-bold mb-4">{{ artikel?.title || 'Judul Artikel' }}</h2>
        <div v-html="artikel?.content || artikel?.description || 'Konten tidak tersedia.'" class="prose max-w-none text-[#134611]"></div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import defaultPhoto from '@/assets/profile.png'
import fallbackImage from '@/assets/fotosawit.jpg'

export default {
  name: 'DetailArtikelPengepulView',
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
      artikel: null,
      user: {
        name: '',
        photo_url: null
      },
      defaultPhoto,
      fallbackImage
    }
  },

  mounted() {
    this.fetchUser()
    const id = this.$route.params.id
    if (id) this.fetchArtikel(id)
  },

  methods: {
    async fetchUser() {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        const { data } = await axios.get(`${this.apiUrl}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const u = data.data || data
        this.user.name      = u.name
        this.user.photo_url = u.photo_url || null
      } catch (err) {
        console.error('Gagal mendapatkan data user:', err)
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          this.$router.push('/login')
        }
      }
    },

    async fetchArtikel(id) {
        const token = localStorage.getItem('token')
        try {
          const { data } = await axios.get(`${this.apiUrl}/api/artikel/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          const a = data.data || data

          // **Mapping image_url sama persis seperti di list**
          a.image_url = a.image
            ? `${this.apiUrl}/${a.image}`
            : this.fallbackImage

          this.artikel = a
        } catch (err) {
          console.error('Gagal memuat artikel:', err)
        }
      },

    goBack() {
      this.$router.go(-1)
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
  