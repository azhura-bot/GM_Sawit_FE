<template>
  <div class="min-h-screen bg-gray-50 p-6 space-y-8">
    <!-- Statistik Grafik -->
    <div class="bg-white p-6 rounded-2xl shadow-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-green-900">Statistik hingga saat ini</h2>
      </div>
      <apexchart type="line" height="350" :options="chartOptions" :series="series" />
    </div>

    <!-- Form Manajemen Harga -->
    <div class="bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <!-- Form Input -->
      <div class="space-y-6">
        <div class="flex items-center gap-3">
          <div class="bg-green-900 text-white p-3 rounded-xl text-xl">💵</div>
          <h3 class="text-2xl font-bold text-green-900">Manajemen Data Harga Kelapa Sawit</h3>
        </div>

        <div class="flex gap-3">
          <button class="bg-green-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-800 hover:shadow-md transition-all">
            Kenaikan
          </button>
          <button class="bg-gray-200 text-green-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 hover:shadow-md transition-all">
            Penurunan
          </button>
        </div>

        <div class="space-y-4">
          <input v-model="form.harga" type="text" placeholder="Harga per Kg" class="w-full p-3 rounded-full bg-gray-200 focus:outline-none" />
          <input v-model="form.kenaikan" type="text" placeholder="Harga kenaikan" class="w-full p-3 rounded-full bg-gray-200 focus:outline-none" />
          <input v-model="form.presentase" type="text" placeholder="Presentase Kenaikan" class="w-full p-3 rounded-full bg-gray-200 focus:outline-none" />
        </div>

        <button @click="submitData" class="bg-green-700 text-white px-6 py-3 rounded-full font-bold">Masukan Data</button>
      </div>

      <!-- Kalender Dinamis -->
      <div>
        <h3 class="text-2xl font-bold text-green-900 mb-2">Tanggal Input Harga</h3>
        <div class="bg-white border rounded-xl shadow-md p-4">
          <div class="flex justify-between items-center mb-4">
            <button @click="prevMonth" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">&laquo;</button>
            <div class="font-bold text-lg">{{ monthYearLabel }}</div>
            <button @click="nextMonth" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">&raquo;</button>
          </div>
          <div class="grid grid-cols-7 text-center text-sm gap-y-1">
            <div class="text-gray-400">Mon</div>
            <div class="text-gray-400">Tue</div>
            <div class="text-gray-400">Wed</div>
            <div class="text-gray-400">Thu</div>
            <div class="text-gray-400">Fri</div>
            <div class="text-gray-400">Sat</div>
            <div class="text-gray-400">Sun</div>

            <div v-for="blank in startDay" :key="'b'+blank" class="text-gray-200">-</div>
            <div
              v-for="day in daysInMonth"
              :key="day"
              class="hover:bg-green-100 cursor-pointer rounded-full py-1"
              :class="{ 'text-green-800 font-bold': isToday(day) }"
            >
              {{ day }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "StatistikHarga",
  data() {
    const today = new Date();
    return {
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear(),
      todayDate: today,
      form: {
        harga: '',
        kenaikan: '',
        presentase: ''
      },
      series: [],
      chartOptions: {
        chart: { id: "harga-chart" },
        xaxis: { categories: [] },
        stroke: { curve: 'smooth' },
        title: {
          text: "Harga Kelapa Sawit per Bulan",
          align: 'left'
        }
      }
    };
  },
  computed: {
    daysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },
    startDay() {
      const day = new Date(this.currentYear, this.currentMonth, 1).getDay();
      return (day + 6) % 7; // Monday = 0
    },
    monthYearLabel() {
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember",
      ];
      return `${months[this.currentMonth]} ${this.currentYear}`;
    }
  },
  mounted() {
    this.fetchChartData();
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await axios.get('https://api.example.com/statistik-harga');
        const data = response.data;
        this.series = [
          {
            name: "Harga Sawit",
            data: data.map(item => item.harga)
          }
        ];
        this.chartOptions.xaxis.categories = data.map(item => item.bulan);
      } catch (error) {
        console.error("Gagal memuat data grafik:", error);
      }
    },
    async submitData() {
      try {
        const payload = {
          harga: this.form.harga,
          kenaikan: this.form.kenaikan,
          presentase: this.form.presentase,
        };
        await axios.post('https://api.example.com/input-harga', payload);
        alert("Data berhasil dikirim!");
        this.fetchChartData();
      } catch (error) {
        console.error("Gagal mengirim data:", error);
        alert("Terjadi kesalahan saat mengirim data.");
      }
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear -= 1;
      } else {
        this.currentMonth -= 1;
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear += 1;
      } else {
        this.currentMonth += 1;
      }
    },
    isToday(day) {
      const t = this.todayDate;
      return (
        day === t.getDate() &&
        this.currentMonth === t.getMonth() &&
        this.currentYear === t.getFullYear()
      );
    }
  }
};
</script>

<style scoped>
/* Tambahan jika ingin mempercantik kalender atau form */
</style>
