<template>
    <div class="main-container">
      <!-- Header -->
      <header class="header">
        <div class="circle"></div>
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
          <input type="text" placeholder="Search..." class="search-input" />
          <button class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </button>
        </div>
  
        <!-- Artikel List -->
        <div class="article-card" v-for="n in 2" :key="n" @click="goToDetail">
          <img src="@/assets/fotosawit.jpg" alt="Foto Sawit" class="article-image" />
          <div class="article-content">
            <h3>Lorem Ipsum</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
export default {
  name: "ArtikelPengepulView",
  methods: {
    goToDetail() {
      this.$router.push({ name: "DetailArtikelPengepul" });
    },
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
  