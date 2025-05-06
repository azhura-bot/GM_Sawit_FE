<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header">
      <div class="circle"></div>
      <span class="username">{{ user?.name || 'nama User' }}</span>
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
          <router-link to="/pengajuan-jadwal" class="main-image">
            <img src="@/assets/pengajuan-jadwal.png" alt="Pengajuan Jadwal" />
            <p>Pengajuan Jadwal</p>
          </router-link>

          <router-link to="/riwayat-petani" class="main-image">
            <img src="@/assets/riwayat-pengajuan.png" alt="Riwayat Pengajuan" />
            <p>Riwayat Pengajuan</p>
          </router-link>

          <router-link to="/artikel" class="main-image">
            <img src="@/assets/icon-artikel.png" alt="Artikel" />
            <p>Artikel</p>
          </router-link>

          <div class="main-image">
            <img src="@/assets/icon-harga.png" alt="Data Harga" />
            <p>Data Harga</p>
          </div>
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
                :src="getImageUrl(artikel)"
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
      user: null,
      articles: [],
      series: [], // akan diisi dari API
      chartOptions: {
        chart: { id: 'harga-sawit-chart' },
        xaxis: {
          categories: [] // akan diisi dari API
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
    this.fetchUser()
    this.fetchArticles()
    this.fetchHargaSawit()
  },
  methods: {
    async fetchUser() {
      const token = localStorage.getItem('token')
      if (!token) {
        console.warn('Token tidak ditemukan, user belum login.')
        return
      }

      try {
        const response = await axios.get(`${this.apiUrl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.user = response.data.data || response.data
      } catch (error) {
        console.error('Gagal mendapatkan data user:', error)
        if (error.response && error.response.status === 401) {
          alert('Sesi login sudah habis, silakan login ulang.')
          localStorage.removeItem('token')
          this.$router.push('/login')
        }
      }
    },

    formatTanggal(tanggal) {
      const date = new Date(tanggal)
      if (isNaN(date.getTime())) return 'Invalid Date'

      const dd = String(date.getDate()).padStart(2, '0')
      const mm = String(date.getMonth() + 1).padStart(2, '0')
      const yyyy = date.getFullYear()
      return `${dd}/${mm}/${yyyy}`
    },

    async fetchHargaSawit() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${this.apiUrl}/api/harga`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const hargaData = response.data.data || []

        // Format tanggal dan harga
        const tanggalFormatted = hargaData.map(item =>
          this.formatTanggal(item.created_at)
        )
        const hargaValues = hargaData.map(item => item.harga)

        // Update chart
        this.series = [
          {
            name: 'Harga Sawit',
            data: hargaValues
          }
        ]

        this.chartOptions = {
          ...this.chartOptions,
          xaxis: {
            ...this.chartOptions.xaxis,
            categories: tanggalFormatted
          }
        }

      } catch (error) {
        console.error('Gagal memuat data harga sawit:', error)
      }
    },

    async fetchArticles() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${this.apiUrl}/api/artikel`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = response.data
        this.articles = data.data || data.artikels || data
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    },

    goToDetail(id) {
      if (id) {
        this.$router.push(`/detail-artikel/${id}`)
      } else {
        console.log('Invalid article ID')
      }
    },

    getImageUrl(artikel) {
      const img = artikel.imageUrl || artikel.image || artikel.image_path || artikel.thumbnail
      if (!img) return require('@/assets/fotosawit.jpg')
      if (/^(https?:)?\/\//.test(img)) return img
      return `${this.apiUrl}/storage/${img}`
    },

    truncate(text, maxLength) {
      if (!text) return ''
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
    }
  }
}
</script>



<style scoped>
.main-container { background-color: #e6f7cf; min-height: 100vh; display: flex; flex-direction: column; align-items: center; }
.header { background-color: #164b1b; width: 100%; padding: 12px; display: flex; align-items: center; justify-content: center; color: white; position: sticky; top: 0; z-index: 10; }
.circle { width: 24px; height: 24px; background-color: white; border-radius: 50%; margin-right: 8px; }
.username { font-weight: bold; }
.content { background: white; margin-top: 12px; width: 100%; max-width: 430px; border-radius: 16px 16px 0 0; padding: 16px; }
.image-section { border-radius: 16px; overflow: hidden; margin-bottom: 16px; }
.main-image { display: flex; flex-direction: column; align-items: center; text-align: center; text-decoration: none; color: inherit; }
.main-image img { width: 80px; height: 80px; margin-bottom: 8px; }
.main-image p { font-size: 14px; margin: 0; }
.menu-section h2, .trending-section h2, .harga-section h2 { margin: 16px 0 8px; color: #134611; font-size: 20px; font-weight: bold; }
.menu-grid { display: flex; justify-content: space-between; margin-top: 12px; gap: 20px; }
.trending-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 kolom */
  gap: 1rem;
}
.card { background: #f2f2f2; flex: 1; border-radius: 12px; overflow: hidden; cursor: pointer; }
.card-image img { width: 100%; height: 100px; object-fit: cover; }
.card-content { padding: 8px; }
.card-content h3 { font-size: 14px; margin: 4px 0; }
.card-content p { font-size: 12px; color: #666; }
.no-articles { text-align: center; color: #666; font-style: italic; }
.harga-section { margin-top: 24px; }
.chart-image { width: 100%; margin-top: 8px; border-radius: 12px; }
</style>