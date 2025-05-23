<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header flex items-center p-4 bg-white shadow">
      <router-link to="/profile" class="inline-block mr-3">
        <!-- jika ada foto, tampilkan; kalau tidak, tampil placeholder putih -->
        <img
          v-if="user.photo"
          :src="`${apiUrl}/storage/${user.photo}`"
          alt="Foto Profil"
          class="w-10 h-10 rounded-full object-cover"
        />
        <div
          v-else
          class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white"
        >
          <span class="text-sm font-bold">?</span>
        </div>
      </router-link>
      <span class="username font-semibold text-white-800">
        {{ user.name || 'nama User' }}
      </span>
    </header>


    <!-- Content -->
    <main class="content">
      <div class="title-section">
        <img src="@/assets/icon-laporan-trans.png" alt="Icon Laporan" class="title-icon" />
        <h1 class="title-text">Laporan</h1>
      </div>

      <!-- Form Section -->
      <section class="form-section">
        <p class="form-instruction">Masukan data anda pada form dibawah ini</p>

        <form @submit.prevent="submitForm">
          <!-- Dropdown Tugas (hanya in_progress) -->
          <div class="form-group">
            <label>Nama Tugas</label>
            <select v-model="selectedTaskId" @change="onTaskChange">
              <option value="">Pilih tugas</option>
              <option
                v-for="task in filteredTasks"
                :key="task.id"
                :value="task.id"
              >
                {{ task.nama_task }}
              </option>
            </select>
          </div>

          <!-- Informasi Otomatis -->
          <div class="form-group">
            <label>Nama Pengepul</label>
            <input type="text" :value="pengepul.name" disabled />
          </div>
          <div class="form-group">
            <label>Nama Petani</label>
            <input type="text" :value="form.namaPetani" disabled />
          </div>
          <div class="form-group">
            <label>Tanggal</label>
            <input type="text" :value="formatTanggal(form.tanggal)" disabled />
          </div>
          <div class="form-group">
            <label>Alamat</label>
            <input type="text" :value="form.alamat" disabled />
          </div>

          <!-- Input Jumlah -->
          <div class="form-group">
            <label>Jumlah (kg)</label>
            <input
              v-model.number="form.jumlah"
              type="number"
              @input="calculateTotal"
            />
          </div>

          <!-- Harga & Total -->
          <div class="form-group">
            <label>Harga Sawit</label>
            <input
              type="text"
              :value="formatRupiah(hargaSawit)"
              disabled
            />
          </div>
          <div class="form-group">
            <label>Total Harga</label>
            <input
              type="text"
              :value="formatRupiah(form.totalHarga)"
              disabled
            />
          </div>

          <!-- Pesan Error -->
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <!-- Tombol -->
          <div class="button-group">
            <button
              type="button"
              class="cancel-button"
              @click="cancelForm"
            >
              Cancel
            </button>
            <button type="submit" class="submit-button">Kirim</button>
          </div>
        </form>
      </section>
    </main>

    <!-- Modal Success -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg p-6 w-80 text-center">
        <h2 class="text-lg font-semibold mb-4 text-[#134611]">Laporan Berhasil</h2>
        <p class="mb-6 text-[#134611]">Laporan sudah dikirim.</p>
        <button
          @click="closeModal"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LaporanView',
  data() {
    return {
      apiUrl: 'https://api.ecopalm.ydns.eu',
      tasks: [],
      user: {
        name: '',
        photo: ''
      },
      selectedTaskId: '',
      hargaSawit: 0,
      pengepul: { name: '' },
      form: {
        namaPetani: '',
        tanggal: '',
        alamat: '',
        jumlah: 0,
        totalHarga: 0,
      },
      errorMessage: '',
      showSuccessModal: false, // untuk kontrol modal
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(t => t.status === 'in_progress');
    }
  },
  methods: {
    async fetchInitialData() {
      try {
        const token = localStorage.getItem('token');

        // Data tugas
        const { data: taskData } = await axios.get(
          `${this.apiUrl}/api/task/by-pengepul`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        this.tasks = taskData.data;

        // Data harga terbaru
        const { data: hargaData } = await axios.get(
          `${this.apiUrl}/api/harga`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (hargaData.data.length) {
          const sorted = hargaData.data.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          );
          this.hargaSawit = sorted[sorted.length - 1].harga;
        }

        // Profil pengepul
        const { data: userData } = await axios.get(
          `${this.apiUrl}/api/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        this.user = userData.data || userData;
        this.pengepul.name = this.user.name;
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Gagal mengambil data awal';
      }
    },

    async onTaskChange() {
      this.errorMessage = '';
      if (!this.selectedTaskId) {
        Object.assign(this.form, {
          namaPetani: '',
          tanggal: '',
          alamat: '',
          jumlah: 0,
          totalHarga: 0
        });
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          `${this.apiUrl}/api/task/${this.selectedTaskId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const janji = data.data.janji_temu;
        this.form.namaPetani = janji.nama_petani;
        this.form.tanggal = janji.tanggal;
        this.form.alamat = janji.alamat;
        this.calculateTotal();
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Gagal memuat data tugas';
      }
    },

    calculateTotal() {
      this.form.totalHarga = this.form.jumlah * this.hargaSawit;
    },

    async submitForm() {
      this.errorMessage = '';
      const token = localStorage.getItem('token');

      if (!this.selectedTaskId) {
        this.errorMessage = 'Kolom Tugas harus diisi';
        return;
      }
      if (!this.form.jumlah || this.form.jumlah <= 0) {
        this.errorMessage = 'Kolom Jumlah harus diisi dengan angka > 0';
        return;
      }

      try {
        await axios.post(
          `${this.apiUrl}/api/transaksi`,
          {
            task_id: this.selectedTaskId,
            jumlah: this.form.jumlah,
            total_harga: this.form.totalHarga
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Tampilkan modal sukses
        this.showSuccessModal = true;
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Gagal mengirim transaksi';
      }
    },

    closeModal() {
      this.showSuccessModal = false;
      // Setelah OK, kembalikan user ke halaman home pengepul
      this.$router.push('/home-pengepul');
    },

    cancelForm() {
      this.$router.push('/home-pengepul');
    },

    formatRupiah(angka) {
      return angka == null
        ? '0'
        : Math.floor(angka)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    formatTanggal(dateStr) {
      if (!dateStr) return '';
      const [ymd] = dateStr.split('T');
      const [y,m,d] = ymd.split('-');
      return `${d}/${m}/${y}`;
    }
  },
  mounted() {
    this.fetchInitialData();
  }
};
</script>

<style scoped>
select {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 16px;
  background: white;
  font-size: 14px;
  color: #134611;
  appearance: none; /* Hilangkan style bawaan browser */
  -webkit-appearance: none;
  -moz-appearance: none;
}

.error-message {
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  font-weight: bold;
}

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
  border-radius: 16px 16px 16px 16px;
  padding: 16px;
}

.title-section {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.title-icon {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

.title-text {
  font-size: 20px;
  font-weight: bold;
  color: #134611;
}

.form-section {
  background: #ebf7da;
  padding: 16px;
  border-radius: 16px;
}

.form-instruction {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 16px;
  color: #134611;
}

.form-group {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 14px;
  font-weight: bold;
  color: #388e3c; /* Ini warna label sesuai request */
  margin-bottom: 4px;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 16px;
  background: white;
  font-size: 14px;
  color: #134611;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.cancel-button {
  background-color: #29b6f6;
  border: none;
  padding: 10px 20px;
  border-radius: 16px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.submit-button {
  background-color: #388e3c;
  border: none;
  padding: 10px 20px;
  border-radius: 16px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
