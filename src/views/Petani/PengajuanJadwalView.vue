<template>
  <div class="main-container">
    <header class="header">
      <div class="circle"></div>
      <span class="username">{{ nama }}</span>
    </header>

    <main class="content">
      <section class="form-section">
        <div class="form-icon-wrapper">
          <img src="@/assets/pengajuan-jadwal.png" alt="Pengajuan Icon" class="form-icon" />
          <p class="form-icon-text">Pengajuan Jadwal</p>
        </div>

        <form class="form-card" @submit.prevent="handleSubmit">
          <p class="form-description">Masukkan data Anda pada form di bawah ini</p>

          <div class="form-group">
            <label>Nama</label>
            <input type="text" v-model="nama" readonly />
          </div>

          <div class="form-group">
            <label>Nomor Telephone</label>
            <input type="text" v-model="no_phone" readonly />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="email" readonly />
          </div>

          <div class="form-group">
            <label>Tanggal Pengambilan</label>
            <input type="date" v-model="tanggal" required />
          </div>

          <div class="form-group">
            <label>Alamat</label>
            <input type="text" v-model="alamat" placeholder="Jl. Mawar No. 1, Bogor" readonly />
            <button type="button" class="btn map-picker" @click="openMapModal">📍 Pilih di Peta</button>
          </div>

          <div class="form-group">
            <label>Jumlah</label>
            <input type="number" v-model="jumlah" placeholder="Contoh: 20 kg" required />
          </div>

          <div class="button-group">
            <button type="button" class="btn cancel" @click="cancelForm">Batal</button>
            <button type="submit" class="btn submit">Kirim</button>
          </div>
        </form>
      </section>
    </main>

    <!-- Modal Sukses -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <img src="@/assets/success-icon.png" alt="Success Icon" class="success-icon" />
        <h2>Pengajuan anda berhasil terkirim</h2>
        <p>Pastikan anda cek riwayat pengajuan jadwal secara berkala mengenai status pengajuan jadwal anda</p>
        <button class="btn close" @click="closeModal">Tutup</button>
      </div>
    </div>

    <!-- Map Modal -->
    <div v-if="isMapOpen" class="modal-overlay">
      <div class="modal-content" style="height: 80vh; padding: 0;">
        <div id="map" style="width: 100%; height: 100%; border-radius: 24px;"></div>
        <button class="btn close" style="position: absolute; top: 16px; right: 16px;" @click="closeMapModal">✖</button>
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
      isMapOpen: false,
      nama: "",
      email: "",
      no_phone: "",
      tanggal: "",
      jumlah: "",
      alamat: "",
      latitude: null,
      longitude: null,
      map: null,
      marker: null,
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      this.nama = user.name || ""
      this.email = user.email || ""
      this.no_phone = user.no_phone || ""  // Pastikan backend mengirim `no_phone` pada data user
    }
  },
  methods: {
    handleSubmit() {
      console.log("Data terkirim:", {
        nama: this.nama,
        email: this.email,
        no_phone: this.no_phone,
        tanggal: this.tanggal,
        jumlah: this.jumlah,
        alamat: this.alamat,
        latitude: this.latitude,
        longitude: this.longitude,
      })
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },
    cancelForm() {
      this.$router.go(-1)
    },
    openMapModal() {
      this.isMapOpen = true
      this.$nextTick(() => {
        this.initMap()
      })
    },
    closeMapModal() {
      this.isMapOpen = false
    },
    initMap() {
      const defaultPos = { lat: -6.595, lng: 106.816 }
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: defaultPos,
        zoom: 13,
      })
      this.marker = new google.maps.Marker({
        position: defaultPos,
        map: this.map,
        draggable: true,
      })
      this.map.addListener("click", (e) => this.setMarker(e.latLng))
      this.marker.addListener("dragend", (e) => this.setMarker(e.latLng))
    },
    setMarker(latLng) {
      this.marker.setPosition(latLng)
      this.latitude = latLng.lat()
      this.longitude = latLng.lng()
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          this.alamat = results[0].formatted_address
          this.isMapOpen = false
        }
      })
    },
  },
}
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

.form-card {
  width: 100%;
  background-color: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 8px;
}

.form {
  width: 100%;
  background-color: #e6f7cf;
  padding: 16px;
  border-radius: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.form-group input {
  padding: 12px 16px;
  border: 1px solid #cfcfcf;
  border-radius: 12px;
  background-color: #f9f9f9;
  font-size: 14px;
  transition: border 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #4b830d;
  background-color: #fff;
}



.button-group {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
}

.btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 9999px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel {
  background-color: #d1e8f5;
  color: #0078b7;
}

.cancel:hover {
  background-color: #b0d9ef;
}

.submit {
  background-color: #4b830d;
  color: white;
}

.submit:hover {
  background-color: #3a6a0a;
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

.map-picker {
  background-color: #f0f0f0;
  color: #333;
  margin-top: 8px;
  font-size: 13px;
}

.map-picker:hover {
  background-color: #e0e0e0;
}

</style>
