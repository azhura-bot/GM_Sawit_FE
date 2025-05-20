<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header">
      <router-link to="/profile-pengepul" class="circle" />
      <span class="username">{{ user.name || 'nama User' }}</span>
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
          <!-- Dropdown Tugas -->
          <div class="form-group">
            <label>Nama Tugas</label>
            <select v-model="selectedTaskId" @change="onTaskChange">
              <option value="">Pilih tugas</option>
              <option v-for="task in tasks" :key="task.id" :value="task.id">
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
            <input v-model.number="form.jumlah" type="number" @input="calculateTotal" />
          </div>

          <!-- Harga & Total -->
          <div class="form-group">
            <label>Harga Sawit</label>
            <input type="text" :value="formatRupiah(hargaSawit)" disabled />
          </div>
          <div class="form-group">
            <label>Total Harga</label>
            <input type="text" :value="formatRupiah(form.totalHarga)" disabled />
          </div>

          <!-- Pesan Error di Bawah Total Harga -->
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <!-- Tombol -->
          <div class="button-group">
            <button type="button" class="cancel-button" @click="cancelForm">Cancel</button>
            <button type="submit" class="submit-button">Kirim</button>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LaporanView',
  data() {
    return {
      apiUrl: 'http://127.0.0.1:8000',
      tasks: [],
      user: { name: '' },
      selectedTaskId: '',
      hargaSawit: 0,
      pengepul: {
        name: '',
      },
      form: {
        namaPetani: '',
        tanggal: '',
        alamat: '',
        jumlah: '',
        totalHarga: '',
      },
      errorMessage: ''
    };
  },
  methods: {
    async fetchInitialData() {
      try {
        const token = localStorage.getItem('token');

        const { data: taskData } = await axios.get('/api/task/by-pengepul', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.tasks = taskData.data;

        const { data: hargaData } = await axios.get('/api/harga', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.hargaSawit = hargaData.data[0]?.harga || 0;

        const { data: userData } = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('User Data:', userData);
        this.pengepul.name = userData.name || '';
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Gagal mengambil data awal';
      }
    },

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

    async onTaskChange() {
      this.errorMessage = '';

      if (!this.selectedTaskId) return;

      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`/api/task/${this.selectedTaskId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const janjiTemu = data.data.janji_temu;
        const pengepul = data.data.pengepul;

        this.form.namaPetani = janjiTemu.nama_petani || '';
        this.form.tanggal = janjiTemu.tanggal || '';
        this.form.alamat = janjiTemu.alamat || '';
        this.pengepul.name = pengepul?.name || 'Tidak diketahui';
        
        this.calculateTotal();
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Gagal memuat data tugas';
      }
    },


    calculateTotal() {
      if (this.form.jumlah && this.hargaSawit) {
        this.form.totalHarga = this.form.jumlah * this.hargaSawit;
      } else {
        this.form.totalHarga = 0;
      }
    },

    async submitForm() {
      this.errorMessage = '';
      const token = localStorage.getItem('token');

      if (!this.selectedTaskId && !this.form.jumlah) {
        this.errorMessage = 'Semua kolom harus diisi';
        return;
      }
      if (!this.selectedTaskId) {
        this.errorMessage = 'Kolom Tugas harus diisi';
        return;
      }
      if (!this.form.jumlah) {
        this.errorMessage = 'Kolom Jumlah harus diisi';
        return;
      }

      try {
        await axios.post('/api/transaksi', {
          task_id: this.selectedTaskId,
          jumlah: this.form.jumlah,
          total_harga: this.form.totalHarga 
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.$router.push('/home-pengepul');
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Gagal mengirim transaksi';
      }
    },

    cancelForm() {
      this.$router.push('/home-pengepul');
    },

    formatRupiah(angka) {
      if (!angka) return '0';
      const rounded = Math.floor(angka); // Hilangkan angka di belakang koma
      return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    formatTanggal(dateStr) {
      if (!dateStr) return '';
      // Ubah 'T' jadi spasi, hilangkan bagian desimal dan timezone
      let cleanStr = dateStr.replace('T', ' ').split('.')[0];
      const [tanggal] = cleanStr.split(' ');
      const [year, month, day] = tanggal.split('-');
      return `${day}/${month}/${year}`;
    }

  },

  mounted() {
    this.fetchInitialData();
    this.fetchUser();
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
