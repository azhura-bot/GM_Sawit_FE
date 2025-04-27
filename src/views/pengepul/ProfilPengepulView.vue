<template>
    <div class="main-container">
      <!-- Header -->
      <header class="header">
      <router-link to="/profile-pengepul" class="circle"></router-link>
      <span class="username">Lorem Ipsum</span>
      </header>
  
      <!-- Content -->
      <main class="content">
        <!-- Profile Section -->
        <div class="profile-section">
          <img src="@/assets/jay.jpg" alt="Profile" class="profile-picture" />
          <h1 class="profile-name">Udin Suyonto</h1>
        </div>
  
        <!-- Info Section -->
        <section class="info-section">
          <p class="info-instruction">Informasi Profil</p>
  
          <div class="info-group">
            <label>Nomor Telephone</label>
            <div class="info-value">{{ profile.nomorTelepon }}</div>
          </div>
  
          <div class="info-group">
            <label>Email</label>
            <div class="info-value">{{ profile.email }}</div>
          </div>
  
          <div class="info-group">
            <label>Alamat</label>
            <div class="info-value">{{ profile.alamat }}</div>
          </div>
  
          <!-- Edit Button -->
          <div class="button-group">
            <button class="edit-button" @click="goToEditProfile">Edit Profil</button>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfilePengepulView',
    data() {
      return {
        profile: {
          nomorTelepon: '081234567890',
          email: 'udin@example.com',
          alamat: 'Jl. Contoh No. 123, Jakarta',
        }
      }
    },
    methods: {
      goToProfile() {
        // Kalau circle diklik, bisa buat fitur lain. Sekarang stay dulu.
      },
      goToEditProfile() {
        this.$router.push('/edit-profile-pengepul');
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
    cursor: pointer;
  }
  
  .username {
    font-weight: bold;
  }
  
  .content {
    background: white;
    margin-top: 12px;
    width: 100%;
    max-width: 430px;
    border-radius: 16px 16px  16px 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .profile-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 8px;
  }
  
  .profile-name {
    font-size: 20px;
    font-weight: bold;
    color: #134611;
  }
  
  .info-section {
    background: #ebf7da;
    width: 100%;
    padding: 16px;
    border-radius: 16px;
  }
  
  .info-instruction {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 16px;
    color: #134611;
    text-align: center;
  }
  
  .info-group {
    margin-bottom: 12px;
  }
  
  label {
    font-size: 14px;
    font-weight: bold;
    color: #388e3c;
    margin-bottom: 4px;
    display: block;
  }
  
  .info-value {
    background: white;
    padding: 10px;
    border-radius: 16px;
    color: #134611;
    font-size: 14px;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  
  .edit-button {
    background-color: #388e3c;
    border: none;
    padding: 10px 20px;
    border-radius: 16px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  </style>
  