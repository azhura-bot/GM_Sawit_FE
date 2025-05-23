<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header flex items-center p-4 bg-white shadow">
      <router-link to="/profile" class="inline-block mr-3">
        <img
          :src="profileSrc"
          alt="Foto Profil"
          class="circle"
          @error="onPhotoError"
        />
      </router-link>
      <span class="username font-semibold text-white-800">
        {{ user.name || 'Nama User' }}
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
                :src="artikel.image_url || defaultArticleImage"
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
import defaultArticleImage from '@/assets/fotosawit.jpg'

export default {
  name: 'MainPage',
  components: { apexchart: ApexCharts },
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL || 'https://api.ecopalm.ydns.eu',
      user: { name: '', photo_url: null },
      defaultPhoto,
      defaultArticleImage,
      articles: [],
      series: [],
      chartOptions: {
        chart: { id: 'harga-sawit-chart' },
        xaxis: { categories: [] },
        yaxis: {
          labels: { formatter: val => 'Rp ' + val.toLocaleString('id-ID') }
        },
        dataLabels: {
          enabled: true,
          formatter: val => 'Rp ' + val.toLocaleString('id-ID'),
          style: { fontSize: '14px', fontFamily: 'Arial, sans-serif' }
        },
        fill: {
          type: 'gradient',
          gradient: { shade: 'light', type: 'vertical', gradientToColors: ['#81C784'], stops: [0, 100] }
        },
        tooltip: {
          x: { format: 'dd/MM/yyyy HH:mm' },
          y: { formatter: val => 'Rp ' + val.toLocaleString('id-ID') },
          theme: 'light',
          style: { fontSize: '14px', fontFamily: 'Arial, sans-serif' }
        }
      }
    }
  },
  computed: {
    latestArticles() {
      return this.articles.slice(0, 4)
    },
    profileSrc() {
      return this.user.photo_url
        ? this.user.photo_url
        : defaultPhoto
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
      if (!token) return
      try {
        const res = await axios.get(`${this.apiUrl}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const u = res.data.data
        this.user.name = u.name
        this.user.photo_url = u.photo_url
      } catch (err) {
        console.error('Error fetching user profile:', err)
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          this.$router.push('/login')
        }
      }
    },

    async fetchArticles() {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${this.apiUrl}/api/artikel`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.articles = (res.data.data || []).map(a => ({
          ...a,
          image_url: a.image ? `${this.apiUrl}/${a.image}` : null
        }))
      } catch (err) {
        console.error('Error fetching articles:', err)
      }
    },

    goToDetail(id) {
      if (id) this.$router.push(`/detail-artikel/${id}`)
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
        this.chartOptions.xaxis.categories = data.map(d => this.formatTanggal(d.created_at))
      } catch (err) {
        console.error('Gagal memuat data harga sawit:', err)
      }
    },

    formatTanggal(tanggal) {
      const d = new Date(tanggal)
      const dd = String(d.getDate()).padStart(2, '0')
      const mm = String(d.getMonth() + 1).padStart(2, '0')
      return `${dd}/${mm}/${d.getFullYear()}`
    },
    onPhotoError() {
      this.user.photo_url = defaultPhoto
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