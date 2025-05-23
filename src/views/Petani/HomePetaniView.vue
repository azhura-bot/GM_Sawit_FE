<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header flex items-center p-4 bg-white shadow">
      <router-link to="/profile" class="inline-block mr-3">
        <img
          :src="user.photo || defaultPhoto"
          alt="Foto Profil"
          class="circle"
        />
      </router-link>
      <span class="username font-semibold text-white-800">
        {{ user.name || 'nama User' }}
      </span>
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
            <img src="@/assets/pengajuan-jadwal.png" alt="Pengajuan Jadwal" />
            <p class="text-[#164b1b]">Pengajuan Jadwal</p>
          </router-link>

          <router-link to="/riwayat-petani" class="menu-item">
            <img src="@/assets/riwayat-pengajuan.png" alt="Riwayat Pengajuan" />
            <p class="text-[#164b1b]">Riwayat Pengajuan</p>
          </router-link>

          <router-link to="/artikel" class="menu-item">
            <img src="@/assets/icon-artikel.png" alt="Artikel" />
            <p class="text-[#164b1b]">Artikel</p>
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
                :src="getImageUrl(artikel)"
                alt="gambar artikel"
                class="object-cover w-full h-full"
              />
            </div>
            <div class="card-content">
              <h3 class="text-[#134611] font-bold">{{ artikel.title }}</h3>
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
        ></apexchart>
      </section>
    </main>
  </div>
</template>

<script>
import ApexCharts from 'vue3-apexcharts'
import axios from 'axios'
import defaultPhoto from '@/assets/profile.png'

export default {
  name: 'MainPage',
  components: { apexchart: ApexCharts },
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL || 'https://api.ecopalm.ydns.eu',
      user: {
        name: '',
        photo: ''
      },
      defaultPhoto,
      articles: [],
      series: [],
      chartOptions: {
        chart: { id: 'harga-sawit-chart' },
        xaxis: { categories: [] },
        yaxis: {
          labels: {
            formatter: val => 'Rp ' + val.toLocaleString('id-ID')
          }
        },
        dataLabels: {
          enabled: true,
          formatter: val => 'Rp ' + val.toLocaleString('id-ID'),
          style: {
            colors: ['#007bff'],
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'vertical',
            gradientToColors: ['#81C784'],
            stops: [0, 100]
          }
        },
        tooltip: {
          x: { format: 'dd/MM/yyyy HH:mm' },
          y: {
            formatter: val => 'Rp ' + val.toLocaleString('id-ID'),
            title: { formatter: s => `${s}:` }
          },
          marker: { show: true, fillColors: ['#0096FF'] },
          theme: 'light',
          style: {
            textcolor: '#000000',
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif'
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

        if (this.user.photo) {
          this.user.photo = `${this.apiUrl}/storage/${this.user.photo}`
        }

      } catch (error) {
        console.error('Gagal mendapatkan data user:', error)
        if (error.response && error.response.status === 401) {
          alert('Sesi login sudah habis, silakan login ulang.')
          localStorage.removeItem('token')
          this.$router.push('/login')
        }
      }
    },

    async fetchArticles() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${this.apiUrl}/api/artikel`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.articles = response.data.data || response.data.artikels || []
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    },

    goToDetail(id) {
      if (id) this.$router.push(`/detail-artikel/${id}`)
    },

    getImageUrl(artikel) {
      const img = artikel.imageUrl || artikel.image || artikel.image_path || artikel.thumbnail
      if (!img) return require('@/assets/fotosawit.jpg')
      return /^(https?:)?\/\//.test(img) ? img : `${this.apiUrl}/storage/${img}`
    },

    truncate(text, maxLength) {
      if (!text) return ''
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
    },

    async fetchHargaSawit() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${this.apiUrl}/api/harga`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = response.data.data || []
        this.series = [{ name: 'Harga Sawit', data: data.map(d => d.harga) }]
        this.chartOptions = {
          ...this.chartOptions,
          xaxis: { categories: data.map(d => this.formatTanggal(d.created_at)) }
        }
      } catch (error) {
        console.error('Gagal memuat data harga sawit:', error)
      }
    },

    formatTanggal(tanggal) {
      const date = new Date(tanggal)
      const dd = String(date.getDate()).padStart(2, '0')
      const mm = String(date.getMonth() + 1).padStart(2, '0')
      return `${dd}/${mm}/${date.getFullYear()}`
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
.image-section {
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
}
.main-image {
  width: 100%;
  border-radius: 12px;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
}
.menu-item img {
  width: 80px;
  height: 80px;
  margin-bottom: 8px;
}
.menu-item p {
  font-size: 14px;
  margin: 0;
  
}

.trending-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.card {
  background: #f2f2f2;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}
.card-image img {
  width: 100%;
  height: 100px;
  object-fit: cover;
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

.no-articles {
  text-align: center;
  color: #666;
  font-style: italic;
}

.harga-section {
  margin-top: 24px;
}
.chart-image {
  width: 100%;
  margin-top: 8px;
  border-radius: 12px;
}

/* Override background menjadi putih (untuk theme light) */
:deep(.apexcharts-theme-light .apexcharts-tooltip) {
  background: #fff !important;
  color: #000 !important;           /* teks utama menjadi hitam */
}

/* Override label (series name) */
:deep(.apexcharts-theme-light .apexcharts-tooltip .apexcharts-tooltip-text-y-label) {
  fill: #000 !important;            /* untuk elemen SVG <tspan> yang pakai fill */
  color: #000 !important;
}

/* Override value */
:deep(.apexcharts-theme-light .apexcharts-tooltip .apexcharts-tooltip-text-value) {
  fill: #000 !important;
  color: #000 !important;
}
</style>