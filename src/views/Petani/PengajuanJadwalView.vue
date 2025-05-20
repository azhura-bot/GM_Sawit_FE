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
            <input type="text" v-model="nama" readonly class="text-[#134611]" />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="text" v-model="email" readonly class="text-[#134611]" />
          </div>

          <div class="form-group">
            <label>Nomor Telepon</label>
            <input type="text" v-model="no_phone" class="text-[#134611]" />
          </div>

          <div class="form-group">
            <label>Tanggal Pengambilan</label>
            <Datepicker
              v-model="tanggal"
              format="yyyy-MM-dd"
              placeholder="Pilih Tanggal"
              class="w-full px-4 py-3 border border-[#cfcfcf] rounded-[12px] bg-[#f9f9f9] text-sm transition-all focus:outline-none focus:border-[#4b830d] focus:bg-white text-[#134611]"
            />
          </div>

          <div class="form-group">
            <label>Jam Pengambilan</label>
            <input type="time" v-model="jam" class="text-[#134611]" />
          </div>

          <div class="form-group">
            <label>Alamat</label>
            <input type="text" v-model="alamat" readonly class="text-[#134611]" />
            <button type="button" class="btn map-picker" @click="openMapModal">📍 Pilih di Peta</button>
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

    <!-- Modal Peta -->
    <div v-if="isMapOpen" class="modal-overlay">
      <div class="modal-content" style="height: 80vh; padding: 0;">
        <div id="map" style="width: 100%; height: 100%; border-radius: 24px;"></div>
        <button class="btn close" style="position: absolute; top: 16px; right: 16px;" @click="closeMapModal">✖</button>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Datepicker from 'vue3-datepicker'

export default {
  name: "PengajuanJadwalView",
  components: { Datepicker },
  data() {
    return {
      isModalOpen: false,
      isMapOpen: false,
      nama: "",
      email: "",
      no_phone: "",
      tanggal: null, // Date object or string
      jam: "",     // string 'HH:mm'
      alamat: "",
      latitude: null,
      longitude: null,
      map: null,
      marker: null,
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user")) || {}
    this.nama = user.name || ""
    this.email = user.email || ""
    this.no_phone = user.no_phone || ""
  },
  methods: {
    openMapModal() {
      this.isMapOpen = true
      this.$nextTick(this.initMap)
    },
    closeMapModal() {
      this.isMapOpen = false
    },
    initMap() {
      const defaultPos = [-6.595, 106.816]
      if (this.map) this.map.remove()
      this.map = L.map("map").setView(defaultPos, 13)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: '&copy; OpenStreetMap contributors' }).addTo(this.map)
      this.marker = L.marker(defaultPos, { draggable: true }).addTo(this.map)
      this.map.on("click", e => this.setMarker(e.latlng))
      this.marker.on("dragend", e => this.setMarker(e.target.getLatLng()))
    },
    setMarker(latlng) {
      this.marker.setLatLng(latlng)
      this.latitude = latlng.lat
      this.longitude = latlng.lng
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`)
        .then(res => res.json())
        .then(data => {
          this.alamat = data.display_name
          this.isMapOpen = false
        })
        .catch(() => alert("Gagal mendapatkan alamat"))
    },
    handleSubmit() {
      const token = localStorage.getItem("token")
      if (!token) return alert("Anda belum login atau token tidak ditemukan")
      if (!this.tanggal || !this.jam || !this.alamat || !this.no_phone) {
        return alert("Harap lengkapi semua data terlebih dahulu.")
      }

      // Format tanggalWaktu: "YYYY-MM-DD HH:mm:00"
      let year, month, day
      if (this.tanggal instanceof Date) {
        year = this.tanggal.getFullYear()
        month = String(this.tanggal.getMonth() + 1).padStart(2, '0')
        day = String(this.tanggal.getDate()).padStart(2, '0')
      } else {
        [year, month, day] = this.tanggal.split('-')
      }
      const [hour, minute] = this.jam.split(':')
      const tanggalWaktu = `${year}-${month}-${day} ${hour.padStart(2,'0')}:${minute.padStart(2,'0')}:00`

      const payload = {
        nama_petani: this.nama,
        email: this.email,
        no_hp: this.no_phone,
        alamat: this.alamat,
        tanggal: tanggalWaktu,
        jam: this.jam,
        latitude: this.latitude,
        longitude: this.longitude,
      }

      fetch("http://127.0.0.1:8000/api/janji-temu", {
        method: "POST",
        mode: "cors",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      .then(async res => {
        const data = await res.json()
        if (!res.ok) {
          const msg = Object.values(data.errors || {}).flat()[0] || data.message || 'Gagal mengirim data'
          return alert(msg)
        }
        this.isModalOpen = true
      })
      .catch(err => {
        console.error(err)
        alert("Terjadi kesalahan saat mengirim data")
      })
    },
    closeModal() {
      this.isModalOpen = false
      this.tanggal = null
      this.jam = ""
      this.alamat = ""
      this.latitude = null
      this.longitude = null
    },
    cancelForm() { this.$router.go(-1) }
  }
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

.form-group input,
.form-group input[type="date"]  {
  padding: 12px 16px;
  border: 1px solid #cfcfcf;
  border-radius: 12px;
  background-color: #f9f9f9;
  font-size: 14px;
  transition: border 0.3s ease;
}

.form-group input:focus,
.form-group input[type="date"]  {
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
