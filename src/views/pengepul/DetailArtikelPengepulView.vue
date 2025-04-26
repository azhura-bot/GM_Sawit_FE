<template>
    <div class="main-container">
      <header class="header">
        <div class="circle"></div>
        <span class="username">Lorem Ipsum</span>
      </header>
  
      <main class="content">
        <!-- Tombol Back dan Image -->
        <div class="top-section">
          <button class="back-button" @click="goBack">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <img src="@/assets/fotosawit.jpg" alt="Foto Sawit" class="detail-image" />
        </div>
  
        <div class="detail-content">
          <h2>Lorem Ipsum</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "DetailArtikelPengepulView",
    methods: {
      goBack() {
        this.$router.go(-1);
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
  