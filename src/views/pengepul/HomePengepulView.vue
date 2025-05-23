<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header flex items-center p-4 bg-white shadow">
      <router-link to="/profile" class="inline-block mr-3">
        <img
          v-if="user.photo"
          :src="user.photo"
          alt="Foto Profil"
          class="circle"
        />
        <div v-else class="circle placeholder"></div>
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
          <router-link to="/tugas-utama-pengepul" class="menu-item">
            <img src="@/assets/icon-tugas.png" alt="Transaksi" />
            <p>Tugas</p>
          </router-link>
          <router-link to="/artikel" class="menu-item">
            <img src="@/assets/icon-artikel.png" alt="Artikel" />
            <p>Artikel</p>
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
        />
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
      apiUrl: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
      user: {
        name: '',
        photo: ''
      },
      articles: [],
      series: [], // akan diisi dari API
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
            colors: ['#007bff'], // warna biru seperti di gambar
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
        if (!token) return

        try {
          const { data: resp } = await axios.get(
            `${this.apiUrl}/api/profile`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          const d = resp.data || resp
          this.user.name = d.name || ''
          // bangun URL full dari field 'photo' yang di-API
          this.user.photo = d.photo
            ? `${this.apiUrl}/storage/${d.photo}`
            : defaultPhoto
        } catch (err) {
          console.error('Gagal fetch user:', err)
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  display: inline-block;
  vertical-align: middle;
}

.placeholder {
  background-color: #ddd;
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
.image-section {
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
}

/* Menu Section Styles */
.menu-section h2 {
  margin-bottom: 12px;
  color: #134611;
  font-size: 20px;
  font-weight: bold;
}
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 16px;
  justify-items: center;
  text-align: center;
}
.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color:#164b1b;
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
  overflow-x: auto;
  padding-bottom: 8px;
}
.card {
  background: #f2f2f2;
  flex: 0 0 auto;
  width: 200px;
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

/* Harga Section Styles */
.harga-section {
  margin-top: 24px;
}
.harga-section h2 {
  margin: 24px 0 12px;
  color: #134611;
  font-size: 20px;
  font-weight: bold;
}

.harga-section h3 {
  color: #134611;
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
