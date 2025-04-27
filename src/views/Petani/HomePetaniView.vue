<template>
    <div class="main-container">
      <!-- Header -->
      <header class="header">
        <div class="circle"></div>
        <span class="username">nama User</span>
      </header>
  
      <!-- Content -->
      <main class="content">
        <!-- Image Section -->
        
        <div class="image-section">
          <img src="@/assets/fotosawit.jpg" alt="Truck" class="main-image" />
        </div>
  
        <!-- Menu Section -->
        <section class="menu-section">
        <h2>Menu</h2>
        <div class="menu-grid">
            <router-link to="/l" class="main-image">
            <img src="@/assets/pengajuan-jadwal.png" alt="Tugas" />
            </router-link>

            <router-link to="/" class="main-image">
            <img src="@/assets/riwayat-pengajuan.png" alt="Artikel" />
            </router-link>

            <div class="main-image">
            <img src="@/assets/icon-artikel.png" alt="Data Harga" />
            </div>

            <div class="main-image">
            <img src="@/assets/icon-harga.png" alt="Laporan" />
            </div>
        </div>
        </section>

  
        <!-- Trending Section -->
        <section class="trending-section">
          <h2>Trending Saat ini</h2>
          <div class="trending-cards">
            <div class="card">
              <div class="card-image"></div>
              <div class="card-content">
                <h3>Lorem Ipsum</h3>
                <p>Deskripsi singkat artikel trending...</p>
              </div>
            </div>
            <div class="card">
              <div class="card-image"></div>
              <div class="card-content">
                <h3>Lorem Ipsum</h3>
                <p>Deskripsi singkat artikel trending...</p>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Harga Hari Ini Section -->
        <!-- Harga Hari Ini Section -->
        <section class="harga-section">
          <h2>Harga Hari Ini</h2>
          <h3>Statistik hingga saat ini</h3>

          <apexchart
            type="area"
            height="300"
            :options="chartOptions"
            :series="series"
              class="chart-image"
            />
        </section>

      </main>
    </div>
  </template>
  
  <script>
  import ApexCharts from 'vue3-apexcharts';

export default {
  name: 'MainPage',
  components: {
    apexchart: ApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: "Harga Sawit",
          data: [800, 820, 790, 850, 870, 860, 890]
        }
      ],
      chartOptions: {
        chart: {
          id: "harga-sawit-chart"
        },
        xaxis: {
          categories: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]
        },
        colors: ["#4CAF50"],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: "vertical",
            gradientToColors: ["#81C784"],
            stops: [0, 100]
          }
        }
      }
    };
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
  z-index: 10; /* Menambahkan z-index untuk memastikan header selalu di atas */
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
    max-width: 430px; /* Biar tetap responsif di HP */
    border-radius: 16px 16px 0 0;
    padding: 16px;
  }
  
  .image-section {
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 16px;
  }
  
  .main-image {
    width: 100%;
    height: auto;
  }
  
  .menu-section h2,
.trending-section h2,
.harga-section h2 {
  margin: 16px 0 8px;
  color: #134611; 
  font-size: 20px; 
  font-weight: bold; 
}

  
  .menu-grid {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    gap: 20px;
  }
  
  .menu-item {
    background: #e6f7cf;
    padding: 12px;
    border-radius: 12px;
    text-align: center;
    flex: 1;
    margin: 4px;
  }
  
  .menu-item img {
    width: 32px;
    height: 32px;
    margin-bottom: 8px;
  }
  
  .trending-cards {
    display: flex;
    gap: 12px;
    margin-top: 12px;
  }
  
  .card {
    background: #f2f2f2;
    flex: 1;
    border-radius: 12px;
    overflow: hidden;
  }
  
  .card-image {
    background: lightgray;
    height: 100px;
  }
  
  .card-content {
    padding: 8px;
  }
  
  .card-content h3 {
    font-size: 14px;
    margin: 4px 0;
  }
  
  .card-content p {
    font-size: 12px;
    color: #666;
  }
  
  .harga-section {
    margin-top: 24px;
  }
  
  .chart-image {
    width: 100%;
    margin-top: 8px;
    border-radius: 12px;
  }
  </style>
  