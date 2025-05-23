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
            class="w-full p-3 rounded-full bg-gray-200 focus:outline-none text-[#134611]"
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
      apiUrl: import.meta.env.VITE_API_URL || 'https://api.ecopalm.ydns.eu',
      form: { harga: '' },
      series: [
        { name: 'Harga Sawit', data: [] }
      ],
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

        console.log('Data API:', data)

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
