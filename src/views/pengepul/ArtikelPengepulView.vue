<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header">
      <router-link to="/profile-pengepul" class="circle"></router-link>
      <span class="username">Lorem Ipsum</span>
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
        <input type="text" placeholder="Search..." class="search-input" v-model="searchQuery" />
        <button class="search-button" @click="searchArticles">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </button>
      </div>

      <!-- Artikel List -->
      <div 
        class="article-card" 
        v-for="(artikel, index) in filteredArticles" 
        :key="index" 
        @click="goToDetail(artikel.id)"
      >
        <img :src="artikel.imageUrl || require('@/assets/fotosawit.jpg')" alt="Foto Artikel" class="article-image" />
        <div class="article-content">
          <h3>{{ artikel.title }}</h3>
          <p>{{ artikel.description }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

  
<script>
import axios from "axios";

export default {
  name: "ArtikelPengepulView",
  data() {
    return {
      articles: [],
      searchQuery: "",
    };
  },
  computed: {
    filteredArticles() {
      if (!this.searchQuery) {
        return this.articles;
      }
      return this.articles.filter(article => 
        article.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await axios.get("https://s0mtl52d-8000.asse.devtunnels.ms/api/artikel"); // Ganti dengan endpoint API kamu
        this.articles = response.data; // Sesuaikan berdasarkan struktur API
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    },
    goToDetail(id) {
      this.$router.push({ 
        name: "DetailArtikelPengepul", 
        params: { id: id } 
      });
    },
    searchArticles() {
      // Optional: bisa diisi logika kalau mau search dari API
      // Untuk sekarang search pakai computed property aja
    }
  },
  mounted() {
    this.fetchArticles();
  },
};
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
    padding: 16px;
    overflow-y: auto;
    flex: 1;
  }
  
  .title-with-icon {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .title-with-icon .icon {
    width: 32px;
    height: 40px;
  }
  
  .title-with-icon h2 {
    font-weight: bold;
    font-size: 24px;
    color: #134611;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    background-color: #d3f5a7;
    padding: 8px 12px;
    border-radius: 24px;
    margin-bottom: 24px;
  }
  
  .search-input {
    flex-grow: 1;
    border: none;
    background: transparent;
    outline: none;
    padding-left: 8px;
    font-size: 16px;
    color: #134611;
  }
  
  .search-button {
    background: none;
    border: none;
    cursor: pointer;
    color: #134611;
  }
  
  .article-card {
    background: #ffffff;
    border: 1px solid #ccc;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
  }
  
  .article-image {
    width: 100%;
    height: 160px;
    object-fit: cover;
    object-position: center;
    border-radius: 12px;
    margin-bottom: 12px;
  }
  
  .article-content h3 {
    font-weight: bold;
    color: #134611;
    margin-bottom: 8px;
  }
  
  .article-content p {
    color: #555;
    font-size: 14px;
  }
  </style>
  