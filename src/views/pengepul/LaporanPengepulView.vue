<template>
  <div class="main-container">
    <!-- Header -->
    <header class="header">
      <router-link to="/profile-pengepul" class="circle"></router-link>
      <span class="username">Lorem Ipsum</span>
      </header>
    <!-- Content -->
    <main class="content">
      <!-- Title Section -->
      <div class="title-section">
        <img src="@/assets/icon-laporan-trans.png" alt="Icon Laporan" class="title-icon" />
        <h1 class="title-text">Laporan</h1>
      </div>

      <!-- Form Section -->
      <section class="form-section">
        <p class="form-instruction">Masukan data anda pada form dibawah ini</p>

        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label>Nama Petani</label>
            <input v-model="form.namaPetani" type="text" />
          </div>
          <div class="form-group">
            <label>Nomor Telephone</label>
            <input v-model="form.nomorTelepon" type="tel" />
          </div>
          <div class="form-group">
            <label>Alamat</label>
            <input v-model="form.alamat" type="text" />
          </div>
          <div class="form-group">
            <label>Jumlah (kg)</label>
            <input v-model="form.jumlah" type="number" />
          </div>
          <div class="form-group">
            <label>Harga Sawit</label>
            <input v-model="form.jumlah" type="number" />
          </div>
          <div class="form-group">
            <label>Total Harga</label>
            <input v-model="form.totalHarga" type="number" />
          </div>

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
export default {
  name: 'LaporanView',
  data() {
    return {
      form: {
        namaPetani: '',
        nomorTelepon: '',
        tanggalPengambilan: '',
        alamat: '',
        jumlah: '',
        jamTiba: '',
        jamPengangkutan: '',
        totalHarga: ''
      }
    }
  },
  methods: {
  submitForm() {
    console.log('Form Submitted:', this.form);
  },
  cancelForm() {
    this.$router.push('/home-pengepul');
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
