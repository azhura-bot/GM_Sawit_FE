<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header">
      <div class="circle"></div>
      <span class="username">Lorem Ipsum</span>
    </header>

    <!-- Content -->
    <main class="content">
      <!-- Form Section -->
      <section class="form-section">
        <div class="form-icon-wrapper">
          <img src="@/assets/pengajuan-jadwal.png" alt="Pengajuan Icon" class="form-icon" />
          <p class="form-icon-text">Pengajuan Jadwal</p> <!-- Tambahin teks di sini -->
        </div>

        

        <form class="form" @submit.prevent="handleSubmit">
          <p class="form-description">Masukan data anda pada form dibawah ini</p>
          <div class="form-group">
            <input type="text" placeholder="Nama Petani" />
          </div>
          <div class="form-group">
            <input type="text" placeholder="Nomor Telephone" />
          </div>
          <div class="form-group">
            <input type="email" placeholder="Email" />
          </div>
          <div class="form-group">
            <input type="date" placeholder="Tanggal Pengambilan" />
          </div>
          <div class="form-group">
            <input type="text" placeholder="Alamat" />
          </div>
          <div class="form-group">
            <input type="number" placeholder="Jumlah" />
          </div>

          <div class="button-group">
            <button type="button" class="btn cancel" @click="cancelForm">Cancel</button>
            <button type="submit" class="btn submit">Kirim</button>
          </div>
        </form>
      </section>
    </main>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <img src="@/assets/success-icon.png" alt="Success Icon" class="success-icon" />
        <h2>Pengajuan anda berhasil terkirim</h2>
        <p>Pastikan anda cek riwayat pengajuan jadwal secara berkala mengenai status pengajuan jadwal anda</p>
        <button class="btn close" @click="closeModal">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PengajuanJadwalView",
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    handleSubmit() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    cancelForm() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
/* Styling sebelumnya tetap */
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
  padding: 24px 16px;
}

.form-icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center; /* Tengahin gambar + teks */
}

.form-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 8px;
}

.form-icon-text {
  font-size: 18px; /* Lebih besar */
  font-weight: bold; /* Tebal */
  color: #134611; /* Warna teks */
}


.form-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.form-icon {
  width: 48px;
  height: 48px;
}

.form-description {
  text-align: center;
  color: #134611;
  font-weight: bold;
  margin-bottom: 16px;
}

.form {
  width: 100%;
  background-color: #e6f7cf;
  padding: 16px;
  border-radius: 16px;
}

.form-group {
  margin-bottom: 12px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 9999px;
  background-color: white;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 9999px;
  font-weight: bold;
  cursor: pointer;
}

.cancel {
  background-color: #009fe3;
  color: white;
  margin-right: 8px;
}

.submit {
  background-color: #4b830d;
  color: white;
  margin-left: 8px;
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-content {
  background: white;
  border-radius: 24px;
  padding: 32px 24px;
  text-align: center; /* <-- ini bikin semua isi di tengah */
  width: 90%;
  max-width: 380px;
  display: flex;         /* tambah flexbox */
  flex-direction: column;
  align-items: center;   /* gambar & text ke tengah */
  justify-content: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  object-fit: contain; /* supaya gambar tetap proporsional */
}


.modal-content h2 {
  color: #134611;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.modal-content p {
  color: #134611;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 24px;
}

.close {
  background-color: #4b830d;
  color: white;
  width: 100%;
}
</style>
