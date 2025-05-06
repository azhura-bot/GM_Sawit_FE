<template>
  <div class="min-h-screen bg-gray-50 p-6 space-y-8">
    <!-- Statistik Grafik -->
    <div class="bg-white p-6 rounded-2xl shadow-md">
      <div class="flex flex-col mb-4">
        <h2 class="text-2xl font-bold text-green-900">Harga Hari Ini</h2>
        <h3 class="text-lg text-gray-600">Statistik hingga saat ini</h3>
      </div>
      <apexchart
        type="area"
        height="300"
        :options="chartOptions"
        :series="series"
        class="chart-image"
      />
    </div>

    <!-- Form Manajemen Harga -->
    <div class="bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <!-- Form Input -->
      <div class="space-y-6">
        <div class="flex items-center gap-3">
          <div class="bg-green-900 text-white p-3 rounded-xl text-xl">💵</div>
          <h3 class="text-2xl font-bold text-green-900">Manajemen Data Harga Kelapa Sawit</h3>
        </div>

        <div class="space-y-4">
          <input
            v-model="form.harga"
            type="text"
            placeholder="Perubahan Harga"
            class="w-full p-3 rounded-full bg-gray-200 focus:outline-none"
          />
        </div>

        <button
          @click="submitData"
          class="bg-green-700 text-white px-6 py-3 rounded-full font-bold"
        >
          Masukan Data
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ApexCharts from 'vue3-apexcharts'

export default {
  name: 'DataStatistikView',
  components: { apexchart: ApexCharts },
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
      form: { harga: '' },
      series: [
        { name: 'Harga Sawit', data: [800, 820, 790, 850, 870, 860, 890] }
      ],
      chartOptions: {
        chart: { id: 'harga-sawit-chart' },
        xaxis: {
          categories: []
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
  mounted() {
    this.fetchChartData()
  },
  methods: {
    async fetchChartData() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push('/login')
        return
      }
      try {
        const { data: res } = await axios.get(`${this.apiUrl}/api/harga`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = res.data || []

        console.log('Data API:', data) // Debug: cek isi data dari API

        // update series data
        this.series = [
          { name: 'Harga Sawit', data: data.map(item => parseFloat(item.harga)) }
        ]

        // format tanggal untuk x-axis dan trigger reaktivitas
        const formattedDates = data.map(item => {
          const d = new Date(item.created_at)
          const day = String(d.getDate()).padStart(2, '0')
          const month = String(d.getMonth() + 1).padStart(2, '0')
          const year = d.getFullYear()
          return `${day}/${month}/${year}`
        })

        // ganti seluruh objek chartOptions agar reactive
        this.chartOptions = {
          ...this.chartOptions,
          xaxis: {
            ...this.chartOptions.xaxis,
            categories: formattedDates
          }
        }
      } catch (err) {
        console.error('Gagal memuat data grafik:', err)
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          this.$router.push('/login')
        }
      }
    },

    async submitData() {
      const token = localStorage.getItem('token')
      if (!token) { this.$router.push('/login'); return }
      if (!this.form.harga) { alert('Harga tidak boleh kosong.'); return }
      try {
        await axios.post(
          `${this.apiUrl}/api/harga`,
          { harga: this.form.harga },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        this.form.harga = ''
        this.fetchChartData()
      } catch (err) {
        console.error('Gagal mengirim data:', err)
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          this.$router.push('/login')
        }
      }
    }
  }
}
</script>

<style scoped>
/* styling asli dipertahankan */
</style>
