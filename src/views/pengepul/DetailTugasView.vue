<template>
    <div class="main-container">
      <!-- Header -->
      <header class="header">
      <router-link to="/profile-pengepul" class="circle"></router-link>
      <span class="username">Lorem Ipsum</span>
      </header>
  
      <!-- Content -->
      <main class="content">
        <!-- Judul -->
        <section class="title-with-icon">
          <img src="@/assets/icon-tugas-trans.png" alt="Icon Tugas" class="icon" />
          <h2> Tugas </h2>
        </section>
  
        <!-- Tugas Baru -->
        <section class="task-category">
          <div class="category-title">Tugas yang baru saja masuk</div>
  
          <!-- Detail Card -->
          <div class="task-card">
            <div class="task-info">
              <div>
                <div class="label">Nama Petani</div>
                <div class="value">Agus Setiawan</div>
              </div>
            </div>
  
            <div class="task-info">
              <div>
                <div class="label">Lokasi</div>
                <div class="value">
                  JL. Swad Jaya No 8, RT 01 / RW 05, Kel. Tanjung Gusta, Kec. Medan Helvetia, Kota Medan, Sumatera Utara 20125
                </div>
              </div>
            </div>
  
            <div class="task-info">
              <div>
                <div class="label">Nomor Tlp</div>
                <div class="value">0877-9999-2345</div>
              </div>
            </div>
  
            <div class="task-info">
              <div>
                <div class="label">Jumlah</div>
                <div class="value">200 Kg</div>
              </div>
            </div>
          </div>
  
          <!-- Tombol -->
          <div class="button-group">
            <button class="button-decline" @click="showModal = true">Tolak?</button>
            <button class="button-accept">Simpan</button>
            <button class="button-back" @click="goBack">Kembali</button>
          </div>
        </section>
      </main>
  
      <!-- Modal -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <div class="warning-img-wrapper">
            <img src="/warning-image.png" alt="Warning" class="warning-img" />
          </div>
          <p class="modal-text">Apakah anda yakin untuk menolak tugas ini?</p>
          <div class="modal-buttons">
            <button class="modal-cancel" @click="showModal = false">Batalkan</button>
            <button class="modal-confirm" @click="confirmDecline">Ya, tolak</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DetailTugasView",
    data() {
      return {
        showModal: false, // ⬅️ Penting supaya modal bisa muncul
      };
    },
    methods: {
      goBack() {
        this.$router.push('/tugas-utama-pengepul'); // ganti sesuai route halaman utama tugasmu
      },
      confirmDecline() {
        this.showModal = false;
        alert('Tugas telah ditolak!');
        this.$router.push('/tugas-utama');
      }
    }
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
    border-radius: 16px 16px 16px 16px;
    padding: 16px;
  }
  
  .title-with-icon {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .title-with-icon .icon {
    width: 40px;
    height: 32px;
  }
  
  .title-with-icon h2 {
    font-weight: bold;
    font-size: 24px;
    color: #134611;
  }
  
  .task-category {
    margin-top: 24px;
  }
  
  .category-title {
    background-color: #d3f5a7;
    padding: 8px 12px;
    border-radius: 12px;
    font-weight: bold;
    color: #134611;
    font-size: 16px;
    margin-bottom: 12px;
  }
  
  .task-card {
    background: #ffffff;
    border: 1px solid #ccc;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .task-info {
    display: flex;
    flex-direction: column;
  }
  
  .label {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
  
  .value {
    font-size: 14px;
    color: #555;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 16px;
  }
  
  .button-decline {
    background-color: #ff6b6b;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    font-weight: bold;
  }
  
  .button-accept {
    background-color: #134611;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    font-weight: bold;
  }
  
  .button-back {
    background-color: #cccccc;
    color: black;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    font-weight: bold;
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }
  
  .modal-content {
    background: white;
    padding: 24px;
    border-radius: 16px;
    text-align: center;
    width: 300px;
  }
  
  .warning-img-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }
  
  .warning-img {
    width: 60px;
    height: 60px;
  }
  
  .modal-text {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 24px;
    color: #134611;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
  
  .modal-cancel {
    background-color: #007bff;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    font-weight: bold;
  }
  
  .modal-confirm {
    background-color: #134611;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    font-weight: bold;
  }
  </style>
  