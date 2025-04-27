<template>
    <div class="main-container">
      <!-- Header -->
      <header class="header">
      <router-link to="/profile-pengepul" class="circle"></router-link>
      <span class="username">Lorem Ipsum</span>
      </header>
  
      <!-- Content -->
      <main class="content">
        <!-- Title Section -->
        <div class="title-section">
          <img src="@/assets/icon-harga-trans.png" alt="Icon Harga" class="title-icon" />
          <h1 class="title-text">Data Harga</h1>
        </div>
  
        <!-- Statistik Section -->
        <section class="section-card">
          <div class="section-header">
            Statistik Hingga Saat Ini
          </div>
          <div class="chart-container">
            <apexchart
              type="area"
              height="250"
              :options="chartOptions"
              :series="series"
              class="chart"
            />
            
          </div>
        </section>
  
        <!-- Tabel Section -->
        <section class="section-card">
          <div class="section-header">
            Data Kenaikan dan Penurunan
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>1D</th>
                  <th>5W</th>
                  <th>1M</th>
                  <th>5M</th>
                  <th>1Y</th>
                  <th>All Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="n in 3" :key="n">
                  <td class="naik">+5.78%</td>
                  <td class="naik">+5.78%</td>
                  <td class="naik">+5.78%</td>
                  <td class="turun">-5.78%</td>
                  <td class="naik">+5.78%</td>
                  <td class="naik">+5.78%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import ApexCharts from 'vue3-apexcharts';
  
  export default {
    name: 'HargaPengepulView',
    components: {
      apexchart: ApexCharts,
    },
    data() {
      return {
        series: [
          {
            name: "Harga Sawit",
            data: [1000, 2500, 1800, 3000, 2200, 4000, 2800, 4500, 3500, 5000]
          }
        ],
        chartOptions: {
          chart: {
            id: "harga-sawit-chart"
          },
          xaxis: {
            categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
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
          },
          grid: {
            show: true
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
  
  .title-section {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .title-icon {
    width: 46px;
    height: 32px;
    margin-right: 8px;
  }
  
  .title-text {
    font-size: 20px;
    font-weight: bold;
    color: #134611;
    
  }
  
  .section-card {
    background: white;
    padding: 16px;
    border-radius: 16px;
    margin-bottom: 24px;
  }
  
  .section-header {
    background: #d4efc3;
    padding: 8px;
    font-weight: bold;
    font-size: 14px;
    border-radius: 12px;
    margin-bottom: 12px;
    text-align: center;
    color: #134611
  }
  
  .chart-container {
    margin-top: 8px;
  }
  
  .chart {
    width: 100%;
  }
  
  
  .table-container {
    margin-top: 8px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
  }
  
  thead {
    background-color: #d4efc3;
  }
  
  thead th {
    padding: 8px;
    font-size: 12px;
    font-weight: bold;
    color: #134611
  }
  
  tbody td {
    padding: 8px;
    font-size: 12px;
  }
  
  .naik {
    color: green;
  }
  
  .turun {
    color: red;
  }
  </style>
  