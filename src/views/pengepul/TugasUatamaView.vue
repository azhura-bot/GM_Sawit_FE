<template>
    <div class="main-container">
      <!-- Header -->
      <header class="header">
        <div class="circle"></div>
        <span class="username">Nama User</span>
      </header>
  
      <!-- Content -->
      <main class="content">
        <section class="task-section">
          <div class="title-with-icon">
            <img src="@/assets/icon-tugas-trans.png" alt="Tugas Icon" class="icon" />
            <h2>Tugas</h2>
          </div>
  
          <!-- Tugas Baru -->
          <div class="task-category">
            <h3 class="category-title">Tugas yang baru saja masuk</h3>
            <router-link to="/detail-tugas-pengepul" class="task-card-link">
            <div class="task-card" v-for="(task, index) in newTasks" :key="index">
              <div class="task-info">
                <div>
                  <p class="label">Nama Petani</p>
                  <p class="value">{{ task.nama }}</p>
                </div>
                <div class="jam">
                  <p class="label">Jam</p>
                  <p class="value">{{ task.jam }}</p>
                </div>
              </div>
              <div class="lokasi">
                <p class="label">Lokasi</p>
                <p class="value">{{ task.lokasi }}</p>
              </div>
            </div>
            </router-link>
          </div>
  
          <!-- Tugas Selesai -->
          <div class="task-category">
            <h3 class="category-title">Tugas yang sudah diselesaikan</h3>
  
            <div class="task-card" v-for="(task, index) in completedTasks" :key="'completed-' + index">
              <div class="task-info">
                <div>
                  <p class="label">Nama Petani</p>
                  <p class="value">{{ task.nama }}</p>
                </div>
                <div class="jam">
                  <p class="label">Jam</p>
                  <p class="value">{{ task.jam }}</p>
                </div>
              </div>
              <div class="lokasi">
                <p class="label">Lokasi</p>
                <p class="value">{{ task.lokasi }}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TugasView',
    data() {
      return {
        newTasks: [
          { nama: 'Agus Setiawan', jam: '10:00 WIB', lokasi: 'Jl. Sawit Jaya No.8, RT 01 / RW 05, Kel. Tanjung Gusta, Kec. Medan Helvetia...' },
          { nama: 'Agus Setiawan', jam: '10:00 WIB', lokasi: 'Jl. Sawit Jaya No.8, RT 01 / RW 05, Kel. Tanjung Gusta, Kec. Medan Helvetia...' },
        ],
        completedTasks: [
          { nama: 'Agus Setiawan', jam: '10:00 WIB', lokasi: 'Jl. Sawit Jaya No.8, RT 01 / RW 05, Kel. Tanjung Gusta, Kec. Medan Helvetia...' },
          { nama: 'Agus Setiawan', jam: '10:00 WIB', lokasi: 'Jl. Sawit Jaya No.8, RT 01 / RW 05, Kel. Tanjung Gusta, Kec. Medan Helvetia...' },
          { nama: 'Agus Setiawan', jam: '10:00 WIB', lokasi: 'Jl. Sawit Jaya No.8, RT 01 / RW 05, Kel. Tanjung Gusta, Kec. Medan Helvetia...' },
        ],
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
    border-radius: 16px 16px 0 0;
    padding: 16px;
  }
  
  .task-section {
    display: flex;
    flex-direction: column;
  }
  
  .title-with-icon {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: bold;
    font-size: 24px; /* Ukuran lebih besar */
    color: #134611;
  }
  
  .title-with-icon .icon {
    width: 40px;
    height: 32px;
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
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .task-info {
    display: flex;
    justify-content: space-between;
  }
  
  .label {
    font-size: 12px;
    font-weight: bold;
    color: #134611;
  }
  
  .value {
    font-size: 14px;
    color: #555;
  }
  
  .jam {
    text-align: right;
  }
  
  .lokasi {
    border-top: 1px solid #eee;
    padding-top: 8px;
  }
  </style>
  