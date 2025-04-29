<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header">
      <router-link to="/profile-pengepul" class="circle" />
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
          <router-link to="/pengajuan-jadwal" class="menu-item">
            <img src="@/assets/icon-tugas.png" alt="Transaksi" />
            <p>Transaksi</p>
          </router-link>
          <router-link to="/artikel" class="main-image">
            <img src="@/assets/icon-artikel.png" alt="Artikel" />
            <p>Artikel</p>
          </router-link>
          <router-link to="/harga-pengepul" class="menu-item">
            <img src="@/assets/icon-harga.png" alt="Data Harga" />
            <p>Data Harga</p>
          </router-link>
          <router-link to="/laporan-pengepul" class="menu-item">
            <img src="@/assets/icon-laporan.png" alt="Laporan" />
            <p>Laporan</p>
          </router-link>
        </div>
      </section>

      <!-- Trending Section -->
      <section class="trending-section">
        <h2>Trending Saat ini</h2>
        <div class="trending-cards">
          <div v-if="latestArticles.length === 0" class="no-articles">
            <p>Tidak ada artikel untuk ditampilkan.</p>
          </div>
          <div
            v-else
            v-for="artikel in latestArticles"
            :key="artikel.id"
            class="card"
            @click="goToDetail(artikel.id)"
          >
            <div class="card-image">
              <img
                :src="resolveImage(artikel)"
                alt="gambar artikel"
                class="object-cover w-full h-full"
              />
            </div>
            <div class="card-content">
              <h3>{{ artikel.title }}</h3>
              <p>{{ truncate(artikel.content || artikel.description, 100) }}</p>
            </div>
          </div>
        </div>
      </section>

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
import ApexCharts from 'vue3-apexcharts'
import axios from 'axios'

export default {
  name: 'MainPage',
  components: { apexchart: ApexCharts },
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
      articles: [],
      series: [
        { name: 'Harga Sawit', data: [800, 820, 790, 850, 870, 860, 890] }
      ],
      chartOptions: {
        chart: { id: 'harga-sawit-chart' },
        xaxis: {
          categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'vertical',
            gradientToColors: ['#81C784'],
            stops: [0, 100]
          }
        }
      }
    }
  },
  computed: {
    latestArticles() {
      return this.articles.slice(0, 4)
    }
  },
  mounted() {
    this.fetchArticles()
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await axios.get(`${this.apiUrl}/api/artikel`)
        this.articles = response.data.data ?? response.data
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    },
    goToDetail(id) {
      this.$router.push({ name: 'DetailArtikel', params: { id } })
    },
    resolveImage(artikel) {
      const path = artikel.imageUrl || artikel.image || artikel.thumbnail
      if (!path) return require('@/assets/fotosawit.jpg')
      if (/^(https?:)?\/\//.test(path)) return path
      return `${this.apiUrl}/storage/${path}`
    },
    truncate(text, maxLength) {
      if (!text) return ''
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
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
.username { font-weight: bold; }
.content {
  background: white;
  margin-top: 12px;
  width: 100%;
  max-width: 430px;
  border-radius: 16px 16px 0 0;
  padding: 16px;
}
.image-section { border-radius: 16px; overflow: hidden; margin-bottom: 16px; }

/* Menu Section Styles */
.menu-section h2 {
  margin-bottom: 12px;
  color: #134611;
  font-size: 20px;
  font-weight: bold;
}
.menu-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
}
.menu-item img {
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
}
.menu-item p {
  font-size: 14px;
  margin: 0;
}

/* Trending Section Styles */
.trending-section h2 {
  margin: 24px 0 12px;
  color: #134611;
  font-size: 20px;
  font-weight: bold;
}
.trending-cards {
  display: flex;
  gap: 12px;
}
.card {
  background: #f2f2f2;
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}
.card-image img { width: 100%; height: 100px; object-fit: cover; }
.card-content { padding: 8px; }
.card-content h3 { font-size: 14px; margin: 4px 0; }
.card-content p { font-size: 12px; color: #666; }
.no-articles { text-align: center; color: #666; font-style: italic; }

/* Harga Section Styles */
.harga-section {
  margin-top: 24px;
}
.harga-section h2,
.harga-section h3 {
  color: #134611;
}
.chart-image { width: 100%; margin-top: 8px; border-radius: 12px; }
</style>